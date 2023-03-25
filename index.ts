import fs from "fs";
import http from "http";

const listUsers = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("Esta es mi primera línea de respuesta");
  res.write("Esta es la segunda");
  res.end("La comunicación terminó");
};

const responseGet = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Comunicación con el método GET");
};

const responseHtml = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>CursosDev</h1>");
  res.end();
};

const responseJson = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.write('{ "name": "CursosDev" }');
  res.end();
};

const responsePdf = (req: http.IncomingMessage, res: http.ServerResponse) => {
  /*     response.writeHead(200, { "content-type": "application/pdf" });
        const content = fs.readFileSync(__dirname + "/public/manual.pdf");
        response.write(content);
        response.end(); */

  console.log("Inicio de lectura de archivo pdf");

  fs.readFile(__dirname + "/public/manual.pdf", (err, content) => {
    if (err) {
      console.log("An error happened");
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("An error happened");
    } else {
      res.writeHead(200, { "content-type": "application/pdf" });
      res.write(content);
      res.end();
      console.log("Archivo enviado");
    }
  });

  console.log("Fin del código de lectura");
};

const responseNotFound = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("Path not found");
  res.end();
};

interface IPath {
  path: string;
  method: string;
  callback: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

const paths: IPath[] = [
  { path: "/usuarios", method: "POST", callback: listUsers },
  { path: "/usuarios", method: "GET", callback: responseGet },
  { path: "/usuarios/html", method: "GET", callback: responseHtml },
  { path: "/usuarios/json", method: "GET", callback: responseJson },
  { path: "/usuarios/pdf", method: "GET", callback: responsePdf },
];

const server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    const cb = paths.find(
      (path: IPath) =>
        path.path === request.url && path.method === request.method
    )?.callback;

    if (cb) {
      cb(request, response);
    } else {
      responseNotFound(request, response);
    }

    /* if (request.url === "/usuarios" && request.method === "POST") {
      listUsers(request, response);
    } else if (request.url === "/usuarios" && request.method === "GET") {
      responseGet(request, response);
    } else if (request.url === "/usuarios/html") {
      responseHtml(request, response);
    } else if (request.url === "/usuarios/json") {
      responseJson(request, response);
    } else if (request.url === "/usuarios/pdf") {
      responsePdf(request, response);
    } else {
      responseNotFound(request, response);
    } */
  }
);

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
