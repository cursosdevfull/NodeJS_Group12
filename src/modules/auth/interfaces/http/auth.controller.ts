import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { IError } from "../../../../core/error/error.interface";
import { AuthApplication } from "../../application/auth.application";
import { Auth } from "../../domain/auth";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthRefreshTokenDto } from "./dtos/auth-refresh-token.dto";

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const authLoginDto = new AuthLoginDto();
    authLoginDto.email = email;
    authLoginDto.password = password;

    const errors = await validate(authLoginDto);

    if (errors.length > 0) {
      const err: IError = new Error();
      err.message = "Validation error";
      err.stack = JSON.stringify(errors);
      err.status = 411;

      return next(err);
    }

    const authResult = Auth.create(authLoginDto);
    if (authResult.isErr()) {
      return next(authResult.error);
    }

    const auth = authResult.value;

    const loginResult = await this.application.login(auth);

    if (loginResult.isErr()) {
      return next(loginResult.error);
    }

    return res.status(200).json(loginResult.value);
  }

  async getNewAccessToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    const authRefreshTokenDto = new AuthRefreshTokenDto();
    authRefreshTokenDto.refreshToken = refreshToken;

    const errors = await validate(authRefreshTokenDto);

    if (errors.length > 0) {
      const err: IError = new Error();
      err.message = "Validation error";
      err.stack = JSON.stringify(errors);
      err.status = 411;

      return next(err);
    }

    const refreshTokenResult = await this.application.getNewAccessToken(
      refreshToken
    );

    if (refreshTokenResult.isErr()) {
      return next(refreshTokenResult.error);
    }

    return res.status(200).json(refreshTokenResult.value);
  }

  async getUserList(req: Request, res: Response, next: NextFunction) {
    const result = await this.application.getUserList();

    return res.status(200).json(result);
  }
}
