import { Exclude, Expose } from "class-transformer";

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  active: boolean;

  @Exclude()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  roles: unknown[];

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
