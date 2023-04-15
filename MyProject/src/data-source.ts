import "reflect-metadata";

import { DataSource } from "typeorm";

import { Car } from "./entity/Car";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3310,
  username: "root",
  password: "12345",
  database: "cursonodejs",
  synchronize: true,
  logging: true,
  entities: [User, Car],
  migrations: [],
  subscribers: [],
});
