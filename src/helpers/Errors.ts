import { Request, Response } from 'express';

import { IError } from '../core/error/error.interface';
import { Parameters } from './Parameters';

export class HandlersErrors {
  static notFound(req: Request, res: Response) {
    res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  }

  static generic(error: IError, req: Request, res: Response) {
    const objError: IError = {
      message: error.message || 'Internal Server Error',
      status: error.status || 500,
      name: error.name || 'No name',
    };

    if (Parameters.ENVIRONMENT === 'development')
      objError.stack = error.stack || 'No stack';

    res.status(objError.status).json(objError);
  }
}
