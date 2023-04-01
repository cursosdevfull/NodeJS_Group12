import { ValueObject } from "src/core/domain/value-objets/value-object";

export class PasswordVO extends ValueObject<string> {
  private constructor(password: string) {
    super();
    this.value = password;
  }

  private static validatePassword(password: string) {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return passwordRegex.test(password);
  }

  static create(password: string): PasswordVO {
    if (!this.validatePassword(password)) {
      throw new Error("Invalid password");
    }
    return new PasswordVO(password);
  }
}
