export class EmailVO {
  private readonly value: string;

  private constructor(value: string) {
    if (!value.includes("@")) throw new Error("Invalid email");
    this.value = value;
  }

  static create(value: string): EmailVO {
    return new EmailVO(value);
  }

  getValue(): string {
    return this.value;
  }
}
