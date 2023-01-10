import { Router } from 'express';
import { UserController } from '../api/controllers/UserController';
import { UpdateUserValidator, authValidator, createUserValidator, validatorMiddleware } from '../middleware/validatorMiddleware';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

export const userRouter = Router();

userRouter.
  post('/',
    createUserValidator,
    validatorMiddleware,
    UserController.create
  );

userRouter.
  post('/login',
    authValidator,
    validatorMiddleware,
    UserController.login
  );

userRouter.
  post('/read',
    authenticateMiddleware,
    validatorMiddleware,
    UserController.read
  );

userRouter.
  put('/update',
    authenticateMiddleware,
    UpdateUserValidator,
    validatorMiddleware,
    UserController.update
  );

userRouter.
  delete('/delete',
    authenticateMiddleware,
    validatorMiddleware,
    UserController.delete
  );
