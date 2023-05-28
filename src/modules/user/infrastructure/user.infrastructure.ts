import { err, ok, Result } from 'neverthrow';
import { In } from 'typeorm';

import DatabaseBootstrap from '../../../bootstrap/Database.bootstrap';
import { IError } from '../../../core/error/error.interface';
import { AuthRepository } from '../../auth/domain/repositories/auth.repository';
import { RoleEntity } from '../../role/infrastructure/entities/role.entity';
import { UserResponse } from '../application/responses/user-created';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/user';
import { UserModelDto } from './dtos/user-model.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

export type UserCreateResult = Result<any, IError>;
//export type UserGetResult = Result<UserResponse | UserResponse[], IError>;
export type UserGetResult = Result<User | User[], IError>;
export type UserGetByPageResult = Result<
  [entities: UserResponse[], total: number],
  IError
>;

export class UserInfrastructure implements UserRepository, AuthRepository {
  async save(user: User): Promise<UserCreateResult> {
    try {
      const repositoryRole =
        DatabaseBootstrap.dataSource?.getRepository(RoleEntity);
      const rolesUser = await repositoryRole?.findBy({
        id: In(user.properties().roles as number[]),
      });

      const repositoryUser =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const userEntity = UserModelDto.fromDomainToData(user);
      userEntity.roles = rolesUser as RoleEntity[];

      await repositoryUser?.save(userEntity);

      return ok(UserDto.fromDomainToResponse(user));
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }

  async get(id: string): Promise<UserGetResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const userEntity = await repository?.findOne({
        where: { id, active: true },
        relations: ['roles'],
      });

      //return ok(UserDto.fromDataToResponse(userEntity));
      return ok(UserDto.fromDataToDomain(userEntity as UserEntity));
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }

  async getByEmail(email: string): Promise<UserGetResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const userEntity = await repository?.findOne({
        where: { email, active: true },
        relations: ['roles'],
      });

      if (!userEntity) {
        const objErr: IError = new Error();
        objErr.message = 'User not found';
        objErr.stack = 'User not found';
        objErr.status = 404;
        return err(objErr);
      }

      /* await repository.query(`SELECT * FROM users WHERE email = '${email}'`) */

      //return ok(UserDto.fromDataToResponse(userEntity));
      return ok(UserDto.fromDataToDomainWithRoles(userEntity as UserEntity));
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }

  async getByRefreshToken(refreshToken: string): Promise<UserGetResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const userEntity = await repository?.findOne({
        where: { refreshToken, active: true },
        relations: ['roles'],
      });

      if (!userEntity) {
        const objErr: IError = new Error();
        objErr.message = 'User not found';
        objErr.stack = 'User not found';
        objErr.status = 404;
        return err(objErr);
      }

      return ok(UserDto.fromDataToDomainWithRoles(userEntity as UserEntity));
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }

  async getUserList() {
    const manager = DatabaseBootstrap.dataSource?.manager;

    const users = await manager?.query(`select * from user`);
    return users;
  }

  async getAll(): Promise<UserGetResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const userEntities = await repository?.find({
        where: { active: true },
      });

      //return ok(UserModelDto.fromDataToResponse(userEntities));
      return ok(UserDto.fromDataToDomain(userEntities as UserEntity[]));
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }

  async getByPage(
    page: number,
    pageSize: number
  ): Promise<UserGetByPageResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource?.getRepository(UserEntity);
      const [userEntities, total] = await repository.findAndCount({
        skip: page * pageSize,
        take: pageSize,
        where: { active: true },
      });

      const entities = UserModelDto.fromDataToResponse(
        userEntities
      ) as UserResponse[];

      return ok([entities, total]);
    } catch (error) {
      const objErr: IError = new Error();
      objErr.message = error.message;
      objErr.stack = error.stack;
      objErr.status = 500;

      return err(objErr);
    }
  }
}
