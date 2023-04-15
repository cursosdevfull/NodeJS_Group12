import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const cars = await manager
    .createQueryBuilder()
    .from(Car, "car")
    .select(["car.id", "car.brand", "car.model"])
    .where("car.id between :min and :max")
    .setParameters({ min: 9, max: 10 })
    .getRawMany();

  console.log(cars);
});
