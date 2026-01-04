import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dns from 'dns';
import https from 'https';
import { fileURLToPath } from 'url';

// Force IPv4 to avoid IPv6 connection issues (Development only)
if (process.env.NODE_ENV === 'development') {
  dns.setDefaultResultOrder('ipv4first');
  https.globalAgent.options.family = 4;
}

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://carlandrediomon.github.io', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Enable pre-flight for all routes

app.use(express.json());
app.use(cookieParser());

// Database Connection Middleware
app.use(async (req, res, next) => {
  // Skip DB connection for OPTIONS requests (preflight)
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
