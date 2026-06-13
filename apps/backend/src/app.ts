import express from 'express';
import cors from 'cors';
import { healthRouter } from '~/controllers/health.controller.js';
import { blogsRouter } from '~/controllers/blogs.controller.js';
import { reactionsRouter } from '~/controllers/reactions.controller.js';

export const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://example.com'
    : (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost:')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
  credentials: true,
}));

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/blogs', reactionsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
