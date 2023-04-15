import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  //const cars = await manager.createQueryBuilder(Car, "car").getMany();
  const cars = await manager
    .createQueryBuilder()
    .from(Car, "auto")
    .select("auto.id, auto.brand")
    .where("auto.id = 10")
    .getRawOne();
  //.getRawMany();

  console.log(cars);

  const sql = await manager
    .createQueryBuilder()
    .from(Car, "auto")
    .select("auto.id, auto.brand")
    .where("auto.id = 10")
    .getSql();

  console.log(sql);
});
