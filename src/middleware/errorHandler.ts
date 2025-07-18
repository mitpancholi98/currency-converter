import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const errorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      details: err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (axios.isAxiosError(err)) {
    const status = err.response?.status || 500;
    return res.status(status).json({
      status,
      error: 'External API Error',
      message: err.message,
      details: err.response?.data ? [err.response.data] : [],
    });
  }

  const status = (err as { status?: number })?.status || 500;
  const message = (err as Error)?.message || 'Internal Server Error';

  return res.status(status).json({
    status,
    error: status === 500 ? 'Internal Server Error' : 'Error',
    message,
    details: [],
  });
};
