import { err, ok, Result } from "neverthrow";

import { IError } from "../../error/error.interface";

export class EmailVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<EmailVO, IError> {
    if (!value.includes("@")) return err(new Error("Invalid email"));
    return ok(new EmailVO(value));
  }

  getValue(): string {
    return this.value;
  }
}
