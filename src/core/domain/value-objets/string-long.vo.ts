import { err, ok, Result } from "neverthrow";

import { IError } from "../../error/error.interface";

export class StringLongVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(
    value: string,
    fieldName: string,
    minLength: number
  ): Result<StringLongVO, IError> {
    if (value.length < minLength) {
      const error: IError = new Error(
        `${fieldName} must be at least ${minLength} characters long`
      );
      error.status = 411;
      return err(error);
    }
    return ok(new StringLongVO(value));
  }

  getValue(): string {
    return this.value;
  }
}
