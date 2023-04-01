import { ValueObject } from "./value-object";

export class EmailVO extends ValueObject<string> {
  private constructor(email: string) {
    super();
    this.value = email;
  }

  private static validateEmail(email: string) {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
    );
    return emailRegex.test(email);
  }

  static create(email: string): EmailVO {
    if (!this.validateEmail(email)) {
      throw new Error("Invalid email");
    }
    return new EmailVO(email);
  }
}
