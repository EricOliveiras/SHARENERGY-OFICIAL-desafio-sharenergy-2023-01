import { Router } from 'express';
import { rootRoute } from './rootRouter';
import { userRouter } from './userRoute';

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/', rootRoute);
