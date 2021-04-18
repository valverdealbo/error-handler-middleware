import type { Request, Response } from 'express';
import { errorHandlerMiddleware } from '../src';

describe('errorHandlerMiddleware()', () => {
  const status = jest.fn();
  const json = jest.fn();
  const next = jest.fn();
  const request = {} as Request;
  let response: Response;

  beforeEach(() => {
    response = ({ locals: {}, status, json } as unknown) as Response;
    status.mockReturnValue(response);
    status.mockClear();
    json.mockClear();
    next.mockClear();
  });

  test('should set the error to response.locals.responseError and send the error', () => {
    const inError = { status: 401, name: 'UnauthorizedError', message: 'invalid username or password' };
    const outError = { status: inError.status, name: inError.name, message: inError.message };
    errorHandlerMiddleware(inError, request, response, next);
    expect(response.locals.responseError).toEqual(outError);
    expect(response.status).toHaveBeenCalledWith(outError.status);
    expect(response.json).toHaveBeenCalledWith({ error: outError });
    expect(next).not.toHaveBeenCalled();
  });

  test('should use default values for the error fields', () => {
    const inError = {};
    const outError = { status: 500, name: 'InternalServerError', message: '' };
    errorHandlerMiddleware(inError, request, response, next);
    expect(response.locals.responseError).toEqual(outError);
    expect(response.status).toHaveBeenCalledWith(outError.status);
    expect(response.json).toHaveBeenCalledWith({ error: outError });
    expect(next).not.toHaveBeenCalled();
  });
});
