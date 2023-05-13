import {
  UserCreateResult,
  UserGetByPageResult,
  UserGetResult,
} from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<UserCreateResult>;
  get(id: string): Promise<UserGetResult>;
  getAll(): Promise<UserGetResult>;
  getByPage(page: number, pageSize: number): Promise<UserGetByPageResult>;
}
