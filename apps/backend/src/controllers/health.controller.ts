import { Router, type Request, type Response } from 'express';
import { getHealthStatus } from '~/services/health.service.js';

export const healthRouter = Router();

healthRouter.get('/', async (req: Request, res: Response) => {
  const health = await getHealthStatus();
  res.status(health.status === 'ok' ? 200 : 503).json(health);
});
