import { User, UserProperties } from "./user";
import { EmailVO } from "./value-objects/email.vo";
import { RoleVO } from "./value-objects/role.vo";
import { StringLongVO } from "./value-objects/string-long.vo";

export class UserFactory {
  static create(properties: UserProperties) {
    const nameVO = StringLongVO.create(properties.name, "Name", 3);
    const lastnameVO = StringLongVO.create(properties.lastname, "Lastname", 3);
    const passwordVO = StringLongVO.create(properties.password, "Password", 8);
    const emailVO = EmailVO.create(properties.email);
    const rolesVO = RoleVO.create(properties.roles);

    return new User(properties);
  }
}
