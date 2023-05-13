import { StringLongVO } from "core-domain/value-objets/string-long.vo";
import { err, ok, Result } from "neverthrow";

import { EmailVO } from "../../../core/domain/value-objets/email.vo";

export type AuthProperties = {
  readonly email: string;
  readonly password: string;
};

export type AuthResult = Result<Auth, Error>;

export class Auth {
  private readonly email: string;
  private readonly password: string;

  private constructor(properties: AuthProperties) {
    Object.assign(this, properties);
  }

  properties() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  static create(properties: AuthProperties): AuthResult {
    const emailResult = EmailVO.create(properties.email);
    if (emailResult.isErr()) return err(emailResult.error);

    const passwordResult = StringLongVO.create(
      properties.password,
      "password",
      8
    );
    if (passwordResult.isErr()) return err(passwordResult.error);

    return ok(new Auth(properties));
  }
}
