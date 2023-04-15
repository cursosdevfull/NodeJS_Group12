import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const userRepository = conn.getRepository(User);
  const carRepository = conn.getRepository(Car);

  const car1 = new Car();
  car1.brand = "Fiat";
  car1.model = "Uno";
  car1.color = "Red";
  car1.year = 1990;

  await carRepository.save(car1);

  const car2 = new Car();
  car2.brand = "Hyundai";
  car2.model = "Accent";
  car2.color = "Blue";
  car2.year = 2010;

  await carRepository.save(car2);

  const user1 = new User();
  user1.name = "John Doe";
  user1.age = 25;
  user1.email = "john@email.com";
  user1.cars = Promise.resolve([car1, car2]);

  await userRepository.save(user1);
});
