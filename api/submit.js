// Simple Node.js/Express API endpoint for form submission with validation and spam protection (ESM version)
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local dev
app.use(cors());
app.use(express.json());

// Rate limiting for spam protection
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: 'Too many submissions, please try again later.'
});
app.use('/api/submit', limiter);

// Simple email regex
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// POST /api/submit
app.post('/api/submit', (req, res) => {
  const { firstName, lastName, email, resumeHeader, skills } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !resumeHeader || !skills) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  // Honeypot for spam bots
  if (req.body._gotcha) {
    return res.status(200).json({ success: true }); // silently ignore spam
  }

  // Save to a file (append for demo; use a DB in production)
  const data = {
    firstName,
    lastName,
    email,
    resumeHeader,
    skills,
    submittedAt: new Date().toISOString()
  };
  const filePath = path.join(__dirname, 'submissions.json');
  let submissions = [];
  if (fs.existsSync(filePath)) {
    submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  submissions.push(data);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});