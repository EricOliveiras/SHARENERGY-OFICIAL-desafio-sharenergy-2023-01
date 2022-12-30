import { Router } from 'express';
import { ClientController } from '../api/controllers/ClientController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { createClientValidator, updateOrDeleteClientValidator, validatorMiddleware } from '../middleware/validatorMiddleware';

export const clientRouter = Router();

clientRouter
  .post('/',
    authenticateMiddleware,
    createClientValidator,
    validatorMiddleware,
    ClientController.create
  );

clientRouter
  .post('/read',
    authenticateMiddleware,
    ClientController.read
  );

clientRouter
  .post('/read-all',
    authenticateMiddleware,
    ClientController.readAll
  );

clientRouter
  .put('/update',
    authenticateMiddleware,
    updateOrDeleteClientValidator,
    validatorMiddleware,
    ClientController.update
  );

clientRouter
  .delete('/delete',
    authenticateMiddleware,
    updateOrDeleteClientValidator,
    validatorMiddleware,
    ClientController.delete
  );
