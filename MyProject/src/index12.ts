import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const carRepository = conn.getRepository(Car);

  const car = await carRepository
    .createQueryBuilder("auto")
    .where("auto.id = 9")
    .getOne();

  console.log(car);
});
