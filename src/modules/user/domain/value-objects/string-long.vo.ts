export class StringLongVO {
  private readonly value: string;

  private constructor(value: string, fieldName: string, minLength: number) {
    if (value.length < minLength)
      throw new Error(
        `${fieldName} must be at least ${minLength} characters long`
      );
    this.value = value;
  }

  static create(
    value: string,
    fieldName: string,
    minLength: number
  ): StringLongVO {
    return new StringLongVO(value, fieldName, minLength);
  }

  getValue(): string {
    return this.value;
  }
}
