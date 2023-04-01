import { v4 } from "uuid";

import { EmailCorporateVO } from "../../../core/domain/value-objets/email-corporate-vo";
import { EmailVO } from "../../../core/domain/value-objets/email-vo";
import { UuidVO } from "../../../core/domain/value-objets/uuid-vo";
import { User, UserProperties } from "./user";
import { PasswordVO } from "./value-objets/password-vo";
import { RolesVO } from "./value-objets/roles-vo";

export class UserFactory {
  static create(
    id: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    roles: string[]
  ) {
    const uuidVO = UuidVO.create(id);

    /*     if (!this.validateEmail(email)) {
      throw new Error("Invalid email");
    } */

    if (!name.trim() || name.trim().length < 3) {
      throw new Error("Invalid name");
    }

    if (!lastname.trim() || lastname.trim().length < 3) {
      throw new Error("Invalid lastname");
    }

    const emailVO = EmailVO.create(email);
    const emailCorporateVO = EmailCorporateVO.create(email);
    const passwordVO = PasswordVO.create(password);
    const rolesVO = RolesVO.create(roles);
    /*     if (!this.validateEmailCorporate(email)) {
      throw new Error("Invalid email corporate");
    } */

    if (!this.validateRoleByDomain(roles, email)) {
      throw new Error("Invalid role by domain");
    }

    /*     if (!this.validatePassword(password)) {
      throw new Error("Invalid password");
    } */

    /*     if (this.validateMinRoles(roles)) {
      throw new Error("Invalid roles");
    } */

    const userProperties: UserProperties = {
      id: uuidVO.getValue(),
      name,
      lastname,
      email: emailVO.getValue(),
      password: passwordVO.getValue(),
      roles: rolesVO.getValue(),
    };

    return new User(userProperties);

    /* return new User(
      uuidVO.getValue(),
      name,
      lastname,
      emailCorporateVO.getValue(),
      passwordVO.getValue(),
      rolesVO.getValue()
    ); */
  }

  static validateRoleByDomain(roles: string[], email: string) {
    const domain = email.split("@")[1];
    if (domain === "company.org" && roles.includes("admin")) {
      return true;
    }
    return false;
  }

  static validateMinRoles(roles: string[]) {
    return roles.length < 1;
  }

  /*   static validateEmail(email: string) {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
    );
    return emailRegex.test(email);
  } */

  static validateEmailCorporate(email: string) {
    const domainAllowed = ["company.org", "company.com", "company.net"];

    const domain = email.split("@")[1];
    if (domainAllowed.includes(domain)) {
      return true;
    }

    return false;
  }

  static validatePassword(password: string) {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );
    return passwordRegex.test(password);
  }
}

const user = UserFactory.create(
  v4(),
  "John",
  "Doe",
  "johh.doe@company.org",
  "ElMundoEsMio123#",
  ["admin"]
);

console.log(user);
console.log(user.properties().email);
console.log(user.delete(), user);
