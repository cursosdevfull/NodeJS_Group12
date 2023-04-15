import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize().then(async (conn) => {
  const userRepository = conn.getRepository(User);

  /*   const user = new User();
  user.name = "John Doe";
  user.email = "john.doe@email.com";
  user.age = 30;

  await userRepository.save(user); */

  const list = await userRepository.find();
  console.log("users", list);

  const userFound = await userRepository.findOne({ where: { id: 2 } });
  console.log("user found", userFound);

  const userAgeFound = await userRepository.findOne({ where: { age: 30 } });
  console.log("user age found", userAgeFound);

  const [usersActive, count] = await userRepository.findAndCount({
    where: { active: true },
  });
  console.log("users active", usersActive);
  console.log("count", count);

  /*   userRepository.find().then((users) => {
    console.log(users);
  }); */
});
