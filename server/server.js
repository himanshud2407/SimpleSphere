import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for .env.local in the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

// ------------- AUTH API -------------
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@simplesphere.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
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


// Supabase setup for courses
const supabaseUrl = process.env.SUPABASE_URL || ''; //For development purpose remove in deployment.
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ------------- COURSES API (Supabase) -------------
app.get('/api/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/courses', authenticateToken, async (req, res) => {
  const { title, img, inst, rating, reviews, price, category, level } = req.body;
  const { data, error } = await supabase.from('courses').insert([
    { title, img, inst, rating, reviews, price, category, level }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put('/api/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, img, inst, rating, reviews, price, category, level } = req.body;
  const { data, error } = await supabase.from('courses').update({
    title, img, inst, rating, reviews, price, category, level
  }).eq('id', id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('courses').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ------------- CONTACT FORM API (Google Sheets & Supabase) -------------
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // 1. Save to Supabase
  const { error } = await supabase.from('leads').insert([{ name, email, subject, message }]);
  
  // 2. Forward to Google Sheets if URL is configured
  const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
  if (GOOGLE_SHEET_URL) {
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, date: new Date().toLocaleString() })
      });
    } catch (err) {
      console.error('Google Sheets Error:', err.message);
    }
  }

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Message sent successfully!' });
});

app.get('/api/leads', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
