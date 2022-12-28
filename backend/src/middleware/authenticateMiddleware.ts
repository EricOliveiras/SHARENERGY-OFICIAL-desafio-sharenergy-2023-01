import { Response, NextFunction, Request } from 'express';
import { HttpException } from '../utils/error/ErrorHandle';

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpException(400, 'Missing auth header');
  }

  const id = authHeader.split(' ')[1];

  if (req.session.singin) {
    req.user = {
      id: id
    };

    return next();
  } else {
    throw new HttpException(401, 'unauthorized');
  }
};
