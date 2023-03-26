import http from "http";

import { app } from "./app";

//app.listen(3000, () => console.log("Server running at http://localhost:3000"));

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => console.log("Server running at http://localhost:3000"))
  .on("error", (err) => console.log(err));

/* server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
 */
