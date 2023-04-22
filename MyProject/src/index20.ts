import { Brackets } from "typeorm";

import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const users = await manager
    .createQueryBuilder()
    .from(User, "user")
    .select(["user.id", "user.name", "user.age"])
    .where("user.age>=:ageMin")
    .andWhere("user.age<=:ageMax")
    .andWhere(
      new Brackets((qb) => {
        qb.where("user.name like :name1", { name1: "%Sagan%" }).orWhere(
          "user.name like :name2",
          { name2: "%Curie%" }
        );
      })
    )
    .setParameters({ ageMin: 30, ageMax: 60 })
    .getRawMany();

  console.log(users);
});
