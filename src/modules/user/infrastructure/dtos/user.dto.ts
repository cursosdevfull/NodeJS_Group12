import { instanceToPlain, plainToInstance } from "class-transformer";

import { UserResponse } from "../../application/responses/user-created";
import { User, UserProperties } from "../../domain/user";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToResponse(user: User) {
    const instance = plainToInstance(UserResponse, user.properties());
    return instanceToPlain(instance, { groups: ["admin", "operators"] });
  }

  static fromDataToResponse(
    data: UserEntity | UserEntity[]
  ): UserResponse | UserResponse[] {
    return plainToInstance(UserResponse, data);
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as User[];
    }
    const properties: UserProperties = {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      photo: data.photo,
      active: data.active,
      roles: data.roles.map((item) => item.id),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
    return User.reconstitute(properties);
  }
}
