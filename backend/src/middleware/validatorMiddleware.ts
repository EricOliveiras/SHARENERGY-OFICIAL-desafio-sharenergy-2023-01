import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const createUserValidator = [
  body('username', 'missing field').exists(),
  body('username', 'required field').notEmpty(),
  body('username', 'must be a string').isString(),
  body('username', 'length invalid, minimum length is 4').isLength({ min: 4 }),
  body('username', 'username must be in lower case').isLowercase(),
  body('email', 'missing field').exists(),
  body('email', 'required field').notEmpty(),
  body('email', 'must be a string').isString(),
  body('email', 'invalid format').isEmail().isLowercase(),
  body('password', 'missing field').exists(),
  body('password', 'required field').notEmpty(),
  body('password', 'must be a string').isString(),
  body('password', 'length invalid, minimum length is 6').isLength({ min: 6 }),
];

export const createClientValidator = [
  body('name', 'missing field').exists(),
  body('name', 'required field').notEmpty(),
  body('name', 'must be a string').isString(),
  body('name', 'length invalid, minimum length is 4').isLength({ min: 4 }),
  body('name', 'name must be in lower case').isLowercase(),
  body('email', 'missing field').exists(),
  body('email', 'required field').notEmpty(),
  body('email', 'must be a string').isString(),
  body('email', 'invalid format').isEmail().isLowercase(),
  body('cpf', 'missing field').exists(),
  body('cpf', 'required field').notEmpty(),
  body('cpf', 'must be a string').isString(),
  body('cpf', 'length invalid, minimum length is 11').isLength({ min: 11, max: 11 }),
  body('phone', 'missing field').exists().optional(),
  body('phone', 'required field').notEmpty(),
  body('phone', 'must be a string').isString(),
  body('address', 'missing field').exists().optional(),
  body('address', 'required field').notEmpty(),
  body('address', 'must be a string').isString(),
];

export const UpdateUserValidator = [
  body('username', 'required field').notEmpty().optional(),
  body('username', 'must be a string').isString().optional(),
  body('username', 'length invalid, minimum length is 4').isLength({ min: 4 }).optional(),
  body('username', 'username must be in lower case').isLowercase().optional(),
  body('email', 'required field').notEmpty().optional(),
  body('email', 'must be a string').isString().optional(),
  body('email', 'invalid format').isEmail().isLowercase().optional(),
  body('password', 'required field').notEmpty().optional().optional(),
  body('password', 'must be a string').isString().optional(),
  body('password', 'length invalid, minimum length is 6').isLength({ min: 6 }).optional(),
];

export const updateOrDeleteClientValidator = [
  body('id', 'missing field').exists(),
  body('id', 'required field').notEmpty(),
  body('id', 'must be a string').isString(),
  body('name', 'missing field').exists().optional(),
  body('name', 'required field').notEmpty().optional(),
  body('name', 'must be a string').isString().optional(),
  body('name', 'length invalid, minimum length is 4').isLength({ min: 4 }).optional(),
  body('name', 'name must be in lower case').isLowercase().optional(),
  body('email', 'missing field').exists().optional(),
  body('email', 'required field').notEmpty().optional(),
  body('email', 'must be a string').isString().optional(),
  body('email', 'invalid format').isEmail().isLowercase().optional(),
  body('cpf', 'missing field').exists().optional(),
  body('cpf', 'required field').notEmpty().optional(),
  body('cpf', 'must be a string').isString().optional(),
  body('cpf', 'length invalid, minimum length is 11').isLength({ min: 11, max: 11 }).optional(),
  body('phone', 'missing field').exists().optional().optional(),
  body('phone', 'required field').notEmpty().optional(),
  body('phone', 'must be a string').isString().optional(),
  body('address', 'missing field').exists().optional().optional(),
  body('address', 'required field').notEmpty().optional(),
  body('address', 'must be a string').isString().optional(),
];

export const authValidator = [
  body('username', 'missing field').exists(),
  body('username', 'required field').notEmpty(),
  body('username', 'must be a string').isString(),
  body('username', 'length invalid, minimum length is 4').isLength({ min: 4 }),
  body('username', 'username must be in lower case').isLowercase(),
  body('password', 'required field').notEmpty(),
  body('password', 'must be a string').isString(),
];

export const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
