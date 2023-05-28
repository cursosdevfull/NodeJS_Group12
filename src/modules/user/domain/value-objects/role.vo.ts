import { err, ok, Result } from 'neverthrow';

export class RoleVO {
  private readonly value: string[] | unknown[];

  private constructor(value: string[] | unknown[]) {
    this.value = value;
  }

  static create(value: string[] | unknown[]): Result<RoleVO, Error> {
    if (value.length < 1) err(new Error('Roles must be at least 1 role'));
    return ok(new RoleVO(value));
  }

  getValue(): string[] | unknown[] {
    return this.value;
  }
}
