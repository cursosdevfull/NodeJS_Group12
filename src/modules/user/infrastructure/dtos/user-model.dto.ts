import { RoleEntity } from "src/modules/role/infrastructure/entities/role.entity";

import { UserCreateResponse } from "../../domain/responses/user-create";
import { User } from "../../domain/user";
import { UserEntity } from "../entities/user.entity";

export class UserModelDto {
  static fromDomainToData(user: User): UserEntity {
    const properties = user.properties();

    const userEntity = new UserEntity();
    userEntity.id = properties.id;
    userEntity.name = properties.name;
    userEntity.lastname = properties.lastname;
    userEntity.email = properties.email;
    userEntity.password = properties.password;
    userEntity.photo = properties.photo;
    userEntity.active = properties.active;
    userEntity.roles = properties.roles as RoleEntity[];

    return userEntity;
  }

  static fromDataToResponse(
    data: UserEntity | UserEntity[]
  ): UserCreateResponse | UserCreateResponse[] {
    if (Array.isArray(data)) {
      return data.map((item) =>
        this.fromDataToResponse(item)
      ) as UserCreateResponse[];
    }

    return {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
    };
  }
}
