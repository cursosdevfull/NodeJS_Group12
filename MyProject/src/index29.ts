import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
  const manager = queryRunner.manager;

  try {
    const insertedCar = await manager
      .createQueryBuilder()
      .from(Car, "car")
      .insert()
      .values({
        brand: "Hyundai",
        model: "Cerato",
        year: 2023,
        color: "Blue",
      })
      .execute();

    const insertedUser = await manager
      .createQueryBuilder()
      .from(User, "user")
      .insert()
      .values({
        name: "Willy Colón",
        email: "tito.nieves@correo.com",
        age: 57,
      })
      .execute();

    console.log("user inserted", insertedUser);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
});
