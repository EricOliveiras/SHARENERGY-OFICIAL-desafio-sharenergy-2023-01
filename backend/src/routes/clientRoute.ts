import { Router } from 'express';
import { ClientController } from '../api/controllers/ClientController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { createClientValidator, deleteClientValidator, updateClientValidator, validatorMiddleware } from '../middleware/validatorMiddleware';

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
  .get('/read-all',
    authenticateMiddleware,
    ClientController.readAll
  );

clientRouter
  .post('/read-by-param',
    authenticateMiddleware,
    ClientController.readByParam
  );

clientRouter
  .put('/update/:id',
    authenticateMiddleware,
    updateClientValidator,
    validatorMiddleware,
    ClientController.update
  );

clientRouter
  .delete('/delete',
    authenticateMiddleware,
    deleteClientValidator,
    validatorMiddleware,
    ClientController.delete
  );
