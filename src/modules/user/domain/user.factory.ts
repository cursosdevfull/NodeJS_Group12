import { err, ok, Result } from "neverthrow";
import { v4 as uuidv4 } from "uuid";

import { EmailVO } from "../../../core/domain/value-objets/email.vo";
import { StringLongVO } from "../../../core/domain/value-objets/string-long.vo";
import { IError } from "../../../core/error/error.interface";
import { User, UserProperties } from "./user";
import { RoleVO } from "./value-objects/role.vo";

export class UserFactory {
  static create(properties: UserProperties): Result<User, IError> {
    const userProperties: UserProperties = {
      ...properties,
      id: uuidv4(),
      refreshToken: uuidv4(),
      active: true,
      createdAt: new Date(),
    };

    const nameResult = StringLongVO.create(userProperties.name, "Name", 3);
    if (nameResult.isErr()) {
      const error: IError = new Error();
      error.status = 411;
      error.message = nameResult.error.message;
      error.stack = nameResult.error.stack;

      return err(error);
    }

    const lastnameResult = StringLongVO.create(
      userProperties.lastname,
      "Lastname",
      3
    );
    if (lastnameResult.isErr()) {
      const error: IError = new Error();
      error.status = 411;
      error.message = lastnameResult.error.message;
      error.stack = lastnameResult.error.stack;

      return err(error);
    }

    const passwordResult = StringLongVO.create(
      userProperties.password,
      "Password",
      8
    );
    if (passwordResult.isErr()) {
      const error: IError = new Error();
      error.status = 411;
      error.message = passwordResult.error.message;
      error.stack = passwordResult.error.stack;

      return err(error);
    }

    const emailResult = EmailVO.create(userProperties.email);
    if (emailResult.isErr()) {
      const error: IError = new Error();
      error.status = 411;
      error.message = emailResult.error.message;
      error.stack = emailResult.error.stack;

      return err(error);
    }

    const rolesResult = RoleVO.create(userProperties.roles);
    if (rolesResult.isErr()) {
      const error: IError = new Error();
      error.status = 411;
      error.message = rolesResult.error.message;
      error.stack = rolesResult.error.stack;

      return err(error);
    }

    return ok(new User(userProperties));
  }
}
