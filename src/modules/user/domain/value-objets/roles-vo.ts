import { ValueObject } from "../../../../core/domain/value-objets/value-object";

export class RolesVO extends ValueObject<string[]> {
  private constructor(roles: string[]) {
    super();
    this.value = roles;
  }

  private static validateRoles(roles: string[]) {
    return roles.length >= 1;
  }

  static create(roles: string[]): RolesVO {
    if (!this.validateRoles(roles)) {
      throw new Error("Invalid roles");
    }
    return new RolesVO(roles);
  }
}
