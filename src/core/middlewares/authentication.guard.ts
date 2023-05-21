import { NextFunction, Request, Response } from "express";

import { IError } from "../error/error.interface";
import { TokenService } from "../services/token.service";

export class AuthenticationGuard {
  private constructor() {}
  static async canActive(req: Request, res: Response, next: NextFunction) {
    const headers: Record<string, any> = req.headers;

    if (!headers["authorization"]) {
      const error: IError = new Error();
      error.message = "Unauthorized";
      error.status = 401;
      error.stack = "Unauthorized";

      return next(error);
    } else {
      const parts = headers["authorization"].split("Bearer");
      if (parts.length !== 2) {
        const error: IError = new Error();
        error.message = "Unauthorized";
        error.status = 401;
        error.stack = "Unauthorized";

        return next(error);
      }

      TokenService.validateAccessToken(parts[1].trim())
        .then((payload: any) => {
          res.locals.roles = payload.roles;
          next();
        })
        .catch((error) => {
          next(error);
        });
    }
  }
}
