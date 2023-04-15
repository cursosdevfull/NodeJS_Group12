import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const carRepository = conn.getRepository(Car);

  const list = await carRepository.find({
    order: { brand: "ASC", color: "DESC" },
  });
  console.log("list", list);
});
