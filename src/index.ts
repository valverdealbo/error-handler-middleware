/* eslint-disable import/no-unresolved,@typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlerMiddleware(error: any, request: Request, response: Response, next: NextFunction): void {
  const responseError = {
    status: error.status ?? error.statusCode ?? 500,
    name: error.name ?? 'InternalServerError',
    message: error.message ?? '',
  };
  response.locals.responseError = responseError;
  response.status(responseError.status).json({ error: responseError });
}
