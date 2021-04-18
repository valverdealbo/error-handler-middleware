import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function errorHandlerMiddleware(error: any, request: Request, response: Response, next: NextFunction): void {
  const rawStatus = error.status ?? error.statusCode;
  const status = typeof rawStatus === 'number' && rawStatus >= 400 && rawStatus < 600 ? rawStatus : undefined;
  const rawName = error.name;
  const name = typeof rawName === 'string' && status !== undefined ? rawName : undefined;
  const rawMessage = error.message;
  const message = typeof rawMessage === 'string' ? rawMessage : '';
  const responseError = {
    status: status ?? 500,
    name: name ?? 'InternalServerError',
    message,
  };
  response.locals.responseError = responseError;
  response.status(responseError.status).json({ error: responseError });
}
