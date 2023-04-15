import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const userRepository = conn.getRepository(User);
  const carRepository = conn.getRepository(Car);

  const car = new Car();
  car.brand = "Fiat";
  car.model = "Uno";
  car.color = "Red";
  car.year = 1990;

  const user = new User();
  user.name = "John Doe";
  user.age = 25;
  user.email = "john@email.com";
  user.car = car;

  //await carRepository.save(car);
  await userRepository.save(user);

  const user2 = new User();
  user2.name = "Jane Doe";
  user2.age = 15;
  user2.email = "jane@email.com";
  user2.car = car;

  await userRepository.save(user2);
});
