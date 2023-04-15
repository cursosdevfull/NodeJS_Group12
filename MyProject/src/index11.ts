import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const carRepository = conn.getRepository(Car);

  const PAGE_SIZE = 2;
  const PAGE = 1;

  const [records, count] = await carRepository.findAndCount({
    skip: PAGE * PAGE_SIZE,
    take: PAGE_SIZE,
    order: { color: "ASC" },
  });

  console.log("Total records: ", count);
  console.log("Records: ", records);
});
