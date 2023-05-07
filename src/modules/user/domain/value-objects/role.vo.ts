export class RoleVO {
  private readonly value: string[] | unknown[];

  private constructor(value: string[] | unknown[]) {
    if (value.length < 1) throw new Error("Roles must be at least 1 role");
    this.value = value;
  }

  static create(value: string[] | unknown[]): RoleVO {
    return new RoleVO(value);
  }

  getValue(): string[] | unknown[] {
    return this.value;
  }
}
