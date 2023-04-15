import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const carRepository = manager.getRepository(Car);

  await manager
    .createQueryBuilder()
    .from(User, "user")
    .update()
    .set({ email: "john.doe@email.com" })
    .where("user.id = :id", { id: 4 })
    .execute();

  await manager
    .createQueryBuilder()
    .from(Car, "car")
    .delete()
    .where("car.id = :id", { id: 7 })
    .execute();

  await carRepository
    .createQueryBuilder()
    .delete()
    .where("car.id = :id")
    .setParameter("id", 8)
    .execute();
});
