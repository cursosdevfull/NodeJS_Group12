import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const userRepository = conn.getRepository(User);
  const carRepository = conn.getRepository(Car);

  const users = await userRepository.find({ relations: ["cars"] });
  console.log("Users: ", users);

  const cars = await carRepository.find();
  console.log("Cars: ", cars);
});
