import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

class ErrorHandleMiddleware {
  public static handleErrors(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export default ErrorHandleMiddleware;
