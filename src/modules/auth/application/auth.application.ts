import { err, ok, Result } from "neverthrow";
import { IError } from "src/core/error/error.interface";

import { TokenService } from "../../../core/services/token.service";
import { Crypt } from "../../../helpers/Crypt";
import { UserRepository } from "../../user/domain/repositories/user.repository";
import { User } from "../../user/domain/user";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthLoginResponseDto } from "./dtos/auth-login-response.dto";

export class AuthApplication {
  constructor(private readonly repository: AuthRepository & UserRepository) {}

  async login(auth: Auth): Promise<Result<AuthLoginResponseDto, Error>> {
    const userResult = await this.repository.getByEmail(
      auth.properties().email
    );

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value;
    const isMatch = await Crypt.compare(
      auth.properties().password,
      user.properties().password
    );

    if (isMatch) {
      const authLoginResponseDto = new AuthLoginResponseDto();
      authLoginResponseDto.accessToken = TokenService.generateAccessToken(user);
      authLoginResponseDto.refreshToken = user.properties().refreshToken;
      return ok(authLoginResponseDto);
    }

    const error: IError = new Error();
    error.message = "Invalid credentials";
    error.stack = "Invalid credentials";
    error.status = 401;

    return err(error);
  }

  async getNewAccessToken(
    refreshToken: string
  ): Promise<Result<AuthLoginResponseDto, Error>> {
    const userResult = await this.repository.getByRefreshToken(refreshToken);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user: User = userResult.value;
    const authLoginResponseDto = new AuthLoginResponseDto();
    authLoginResponseDto.accessToken = TokenService.generateAccessToken(user);

    user.update({ refreshToken: TokenService.generateRefreshToken() });
    await this.repository.save(user);

    authLoginResponseDto.refreshToken = user.properties().refreshToken;
    return ok(authLoginResponseDto);
  }

  async getUserList() {
    return await this.repository.getUserList();
  }
}
