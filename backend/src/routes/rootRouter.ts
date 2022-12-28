import { Router, Request, Response } from 'express';

export const rootRoute = Router();

rootRoute.use('/', (req: Request, res: Response) => {
  res.send('Sharenergy Api');
});
