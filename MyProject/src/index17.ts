import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const cars = await manager
    .createQueryBuilder()
    .from(Car, "car")
    .select(["car.id", "car.brand", "car.model"])
    .where("car.id in (:...ids)")
    .setParameters({ ids: [9, 11] })
    .getRawMany();

  console.log(cars);
});
