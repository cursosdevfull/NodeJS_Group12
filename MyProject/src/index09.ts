import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const userRepository = conn.getRepository(User);
  const carRepository = conn.getRepository(Car);

  const [user] = await userRepository.find({
    select: {
      name: true,
      email: true,
    },
  });
  console.log("user", user);
  const cars = await user.cars;
  console.log("cars", cars);
});
