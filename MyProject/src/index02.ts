import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const carRepository = conn.getRepository(Car);

  const car = new Car();
  car.brand = "Fiat";
  car.model = "Uno";
  car.color = "Red";
  car.year = 1990;

  const inserted = await carRepository.save(car);
  console.log("inserted", inserted);
});
