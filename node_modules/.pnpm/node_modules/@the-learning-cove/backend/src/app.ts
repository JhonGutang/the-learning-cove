import express from 'express';
import cors from 'cors';
import { healthRouter } from '~/controllers/health.controller.js';
import { blogsRouter } from '~/controllers/blogs.controller.js';

export const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://example.com'
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/blogs', blogsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
