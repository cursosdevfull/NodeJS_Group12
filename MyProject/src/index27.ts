import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async (conn) => {
  const manager = conn.manager;

  const users = await manager.query("call getUserByAge(?)", [34]);

  console.log(users[0]);

  await manager.query("call insertUser(?, ?, ?)", [
    "John",
    "john@correo.com",
    62,
  ]);
});
