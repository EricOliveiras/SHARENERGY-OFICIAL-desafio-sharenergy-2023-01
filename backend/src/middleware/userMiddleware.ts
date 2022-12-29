import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const createUserValidator = [
  body('username', 'missing field').exists(),
  body('username', 'required field').notEmpty(),
  body('username', 'must be a string').isString(),
  body('username', 'length invalid, minimum length is 4').isLength({ min: 4 }),
  body('email', 'missing field').exists(),
  body('email', 'required field').notEmpty(),
  body('email', 'must be a string').isString(),
  body('email', 'invalid format').isEmail().isLowercase(),
  body('password', 'missing field').exists(),
  body('password', 'required field').notEmpty(),
  body('password', 'must be a string').isString(),
  body('password', 'length invalid, minimum length is 6').isLength({ min: 6 }),
];

export const UpdateUserValidator = [
  body('username', 'required field').notEmpty().optional(),
  body('username', 'must be a string').isString().optional(),
  body('username', 'length invalid, minimum length is 4').isLength({ min: 4 }).optional(),
  body('email', 'required field').notEmpty().optional(),
  body('email', 'must be a string').isString().optional(),
  body('email', 'invalid format').isEmail().optional().isLowercase(),
  body('password', 'required field').notEmpty().optional(),
  body('password', 'must be a string').isString().optional(),
  body('password', 'length invalid, minimum length is 6').isLength({ min: 6 }).optional(),
];

export const authValidator = [
  body('email', 'required field').notEmpty(),
  body('email', 'must be a string').isString(),
  body('email', 'invalid format').isEmail().isLowercase(),
  body('password', 'required field').notEmpty(),
  body('password', 'must be a string').isString(),
];

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
