import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for .env.local in the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Security and Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for development, enable if serving static files
}));
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploads statically
app.use('/uploads', express.static(uploadDir));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ------------- AUTH API -------------
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@simplesphere.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ------------- COURSES API (Supabase) -------------
app.get('/api/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/courses', authenticateToken, async (req, res) => {
  const { title, img, inst, rating, reviews, price, category, level, description, about_course, curriculum, duration, last_updated, materials_included, learning_objectives, feature_cards, original_price, enrolled_count, instructor_title, instructor_bio, instructor_image } = req.body;
  
  const courseData = {
    title, 
    img, 
    inst, 
    rating: rating || "5.0", 
    reviews: reviews || "0", 
    price, 
    category, 
    level,
    description: description || "",
    about_course: about_course || "",
    curriculum: curriculum || [],
    duration: duration || "",
    last_updated: last_updated || "",
    materials_included: materials_included || [],
    learning_objectives: learning_objectives || [],
    feature_cards: feature_cards || [],
    original_price: original_price || "",
    enrolled_count: enrolled_count || "",
    instructor_title: instructor_title || "",
    instructor_bio: instructor_bio || "",
    instructor_image: instructor_image || ""
  };

  const { data, error } = await supabase.from('courses').insert([courseData]).select();
  if (error) {
    console.error('Supabase Insert Error:', error);
    if (error.code === 'PGRST204') {
      return res.status(400).json({ error: `Schema Mismatch: ${error.message}. Please run the SQL script in your Supabase editor and then run 'NOTIFY pgrst, "reload schema";' to refresh the cache.` });
    }
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.put('/api/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, img, inst, rating, reviews, price, category, level, description, about_course, curriculum, duration, last_updated, materials_included, learning_objectives, feature_cards, original_price, enrolled_count, instructor_title, instructor_bio, instructor_image } = req.body;
  
  const { data, error } = await supabase.from('courses').update({
    title, img, inst, rating, reviews, price, category, level, description, about_course, curriculum, duration, last_updated, materials_included, learning_objectives, feature_cards, original_price, enrolled_count, instructor_title, instructor_bio, instructor_image
  }).eq('id', id).select();
  
  if (error) {
    console.error('Supabase Update Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.delete('/api/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------- CONTACT FORM API (Supabase) -------------
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const { error } = await supabase.from('leads').insert([{ name, email, subject, message, status: 'pending' }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Message sent successfully!' });
});

app.get('/api/leads', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/leads/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch('/api/leads/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------- INSTRUCTORS API (Supabase) -------------
app.post('/api/instructors', async (req, res) => {
  const { fullName, email, expertise } = req.body;
  
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Full name and email are required.' });
  }

  const { data, error } = await supabase.from('instructors').insert([{ 
    fullName, 
    email, 
    expertise,
    status: 'pending'
  }]).select();
  
  if (error) {
    console.error('Instructor application error:', error);
    if (error.code === 'PGRST204') {
      return res.status(400).json({ error: "Database schema mismatch. Please ensure 'fullName' and 'status' columns exist." });
    }
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true, message: 'Application submitted successfully', data });
});

app.get('/api/instructors', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from('instructors').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/instructors/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('instructors').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch('/api/instructors/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { error } = await supabase.from('instructors').update({ status }).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});
// ------------- CAREERS API (Supabase) -------------
app.post('/api/careers', async (req, res) => {
  const { fullName, email, university, resumeUrl } = req.body;
  
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Full name and email are required.' });
  }

  const { data, error } = await supabase.from('careers').insert([{ 
    fullname: fullName, 
    email, 
    university,
    resumeurl: resumeUrl,
    status: 'pending'
  }]).select();
  
  if (error) {
    console.error('Career application error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true, message: 'Application submitted successfully', data });
});

app.get('/api/careers', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from('careers').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/careers/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('careers').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch('/api/careers/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { error } = await supabase.from('careers').update({ status }).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
