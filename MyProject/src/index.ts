import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async () => {
  const report = await AppDataSource.manager
    .createQueryBuilder()
    .from(Car, "car")
    .select([
      "car.id",
      "car.brand",
      "car.model",
      "car.year",
      "car.color",
      "user.name",
      "user.email",
      "user.age",
    ])
    .leftJoin("car.users", "user")
    .getRawMany();

  console.log(report);
});
