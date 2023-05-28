import { NextFunction, Request, Response } from 'express';

export abstract class AuthorizationGuard {
  static canActive(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const locals: Record<string, any> = res.locals;

      for (let i = 0; i < rolesAllowed.length; i++) {
        if (locals.roles.includes(rolesAllowed[i])) {
          return next();
        }
      }

      const error: Record<string, any> = new Error();
      error.message = 'Access forbidden';
      error.status = 409;
      error.stack = 'Access forbidden';

      return next(error);
    };
  }
}
