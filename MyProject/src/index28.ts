import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const insertedUser = await manager
    .createQueryBuilder()
    .from(User, "user")
    .insert()
    .values({ name: "Jane Doe", email: "jane.doe@correo.com", age: 23 })
    .execute();

  console.log(insertedUser);
});
