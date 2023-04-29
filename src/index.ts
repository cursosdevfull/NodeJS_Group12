import { app } from "./app";
import ServerBootstrap from "./bootstrap/Server.bootstrap";

const server = new ServerBootstrap(app);

(async () => {
  try {
    const listPromises = [server.initialize()];
    await Promise.all(listPromises);
    console.log("Everything is ready!");
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
})();
