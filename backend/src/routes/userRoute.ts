import { Router } from 'express';
import { UserController } from '../api/controllers/UserController';
import { UpdateUserValidator, authValidator, createUserValidator, userMiddleware } from '../middleware/userMiddleware';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

export const userRouter = Router();

userRouter.
  post('/',
    createUserValidator,
    userMiddleware,
    UserController.create
  );

userRouter.
  post('/login',
    authValidator,
    userMiddleware,
    UserController.login
  );

userRouter.
  post('/logout',
    authenticateMiddleware,
    userMiddleware,
    UserController.logout
  );

userRouter.
  post('/read',
    authenticateMiddleware,
    userMiddleware,
    UserController.read
  );

userRouter.
  put('/update',
    authenticateMiddleware,
    UpdateUserValidator,
    userMiddleware,
    UserController.update
  );

userRouter.
  delete('/delete',
    authenticateMiddleware,
    userMiddleware,
    UserController.delete
  );
