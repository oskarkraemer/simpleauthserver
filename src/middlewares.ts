import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/responses/errorResponse';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export const validateRequest = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        messages: Object.values(err.constraints || {}),
      }));
      return next({ message: "Validation failed", errors: formattedErrors });
    }

    next();
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  console.error(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
