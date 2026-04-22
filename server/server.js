import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

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

app.post('/api/courses', authenticateToken, async (req, res) => {
  const { title, img, inst, rating, reviews, price, category, level, enrollmentUrl } = req.body;
  
  const courseData = {
    title, 
    img, 
    inst, 
    rating: rating || "5.0", 
    reviews: reviews || "0", 
    price, 
    category, 
    level,
    enrollmentUrl: enrollmentUrl || ""
  };

  const { data, error } = await supabase.from('courses').insert([courseData]).select();
  if (error) {
    console.error('Supabase Insert Error:', error);
    if (error.code === 'PGRST204') {
      return res.status(400).json({ error: "Missing 'enrollmentUrl' column in Supabase. Run the SQL fix in your Supabase editor." });
    }
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.put('/api/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, img, inst, rating, reviews, price, category, level, enrollmentUrl } = req.body;
  
  const { data, error } = await supabase.from('courses').update({
    title, img, inst, rating, reviews, price, category, level, enrollmentUrl
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
