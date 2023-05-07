import DatabaseBootstrap from "../../../bootstrap/Database.bootstrap";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserCreateResponse } from "../domain/responses/user-create";
import { User } from "../domain/user";
import { UserModelDto } from "./dtos/user-model.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<void> {
    const repository = DatabaseBootstrap.dataSource?.getRepository(UserEntity);
    const userEntity = UserModelDto.fromDomainToData(user);
    const userInserted = await repository?.save(userEntity);
  }

  async get(id: string): Promise<UserCreateResponse> {
    const repository = DatabaseBootstrap.dataSource?.getRepository(UserEntity);
    const userEntity = await repository?.findOne({
      where: { id, active: true },
    });

    return UserModelDto.fromDataToResponse(userEntity) as UserCreateResponse;
  }
  async getAll(): Promise<UserCreateResponse | UserCreateResponse[]> {
    const repository = DatabaseBootstrap.dataSource?.getRepository(UserEntity);
    const userEntities = await repository?.find({
      where: { active: true },
    });

    return UserModelDto.fromDataToResponse(userEntities);
  }

  async getByPage(
    page: number,
    pageSize: number
  ): Promise<[entities: UserCreateResponse[], total: number]> {
    const repository = DatabaseBootstrap.dataSource?.getRepository(UserEntity);
    const [userEntities, total] = await repository?.findAndCount({
      skip: page * pageSize,
      take: pageSize,
      where: { active: true },
    });

    const entities = UserModelDto.fromDataToResponse(
      userEntities
    ) as UserCreateResponse[];

    return [entities, total];
  }
}
