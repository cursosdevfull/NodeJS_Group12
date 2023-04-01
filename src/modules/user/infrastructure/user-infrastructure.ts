import { UserRepository } from "../domain/repositories/user-repository";
import { User } from "../domain/user";

const users = [
  {
    id: "058cda1c-91da-47a5-9e40-80f434675e5c",
    name: "Carolina",
    lastname: "Gonzalez",
    email: "caro@email.com",
    password: "TodoONada2023#",
    token: ["admin", "operator"],
  },
  {
    id: "c205c909-cf97-4ab5-a1dd-783f95270fa3",
    name: "Alondra",
    lastname: "Samaniego",
    email: "alondra@email.com",
    password: "QuienSAve20034#",
    roles: ["admin", "operator", "client"],
  },
];

export class UserInfrastructure implements UserRepository {
  save(user: User): Promise<void> {
    return Promise.resolve();
  }
  find(id: string): Promise<any> {
    return Promise.resolve(users[0]);
  }
  findAll(): Promise<any[]> {
    return Promise.resolve(users);
  }
}
