import { UserCreateResponse } from "../responses/user-create";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<void>;
  get(id: string): Promise<UserCreateResponse>;
  getAll(): Promise<UserCreateResponse | UserCreateResponse[]>;
  getByPage(
    page: number,
    pageSize: number
  ): Promise<[entities: UserCreateResponse[], total: number]>;
}
