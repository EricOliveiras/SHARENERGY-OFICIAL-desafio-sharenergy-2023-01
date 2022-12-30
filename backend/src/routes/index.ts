import { Router } from 'express';
import { rootRoute } from './rootRouter';
import { userRouter } from './userRoute';
import { clientRouter } from './clientRoute';

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/client', clientRouter);
routes.use('/', rootRoute);
