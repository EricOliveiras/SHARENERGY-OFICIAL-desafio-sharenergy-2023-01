import { Response, NextFunction, Request } from 'express';
import { HttpException } from '../utils/error/ErrorHandle';
import { verify } from 'jsonwebtoken';
import { secret } from '../config';

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new HttpException(400, 'Missing auth header');
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = <{ user_id: string }>verify(token, secret);
    
    req.user = {
      id: payload.user_id,
    };

    return next();
  } catch {
    throw new HttpException(401, 'Unauthorized');
  }
};
