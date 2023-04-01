export interface UserRequired {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserOptional {
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private readonly roles: string[];
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    /* this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.roles = roles; */
    this.active = true;
    this.createdAt = new Date();
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(name: string, lastname: string, password: string) {
    this.name = name;
    this.lastname = lastname;
    this.password = password;
    this.updatedAt = new Date();
  }

  delete() {
    this.active = false;
    this.deletedAt = new Date();
  }
}

//const user = new User("1", "John", "Doe", "john.doe@email.com", "1345", []);
