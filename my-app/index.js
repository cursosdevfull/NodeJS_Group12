const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello world");
});

server.listen(4150, () => console.log("Server executing on port 4150"));
