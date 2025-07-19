import { Request, Response } from 'express';

export const notFoundHandler = (_: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    status: 404,
    error: 'Not Found',
    message: "The route your are looking for doesn't exist",
    details: [],
  });
};
