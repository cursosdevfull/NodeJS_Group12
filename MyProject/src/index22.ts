import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const users = await manager
    .createQueryBuilder()
    .from(User, "user")
    .select("distinct user.age", "age")
    .getRawMany();

  console.log(users);
});
