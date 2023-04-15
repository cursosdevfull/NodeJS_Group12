import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const cars = await manager
    .createQueryBuilder()
    .from(Car, "car")
    .select(["car.id", "car.brand", "car.model"])
    .where("car.id>=:idMin and car.id<=:idMax")
    .setParameters({ idMin: 9, idMax: 11 })
    .getRawMany();

  console.log(cars);
});
