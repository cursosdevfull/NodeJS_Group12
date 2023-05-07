import { v4 as uuidv4, validate } from "uuid";

/*


    required: id, name, lastname, email, password, roles
    optional: photo, active, createdAt, updatedAt, deletedAt

    id must be a string
    name must be a string
    lastname must be a string
    email must be a string
    password must be a string
    roles must be an array of strings
    photo must be a string
    active must be a boolean
    createdAt must be a date
    updatedAt must be a date
    deletedAt must be a date

    id must be a valid uuid
    name must be at least 3 characters long
    lastname must be at least 3 characters long
    email must be a valid email
    password must be at least 8 characters long
    roles must be at least 1 role
*/

export interface UserRequired {
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[] | unknown[];
}

export interface UserOptional {
  readonly id: string;
  readonly photo: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private roles: string[] | unknown[];
  private photo: string;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    this.id = uuidv4();
    this.active = true;
    this.createdAt = new Date();
    Object.assign(this, properties);

    if (!validate(this.id)) throw new Error("Invalid id");
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      photo: this.photo,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
