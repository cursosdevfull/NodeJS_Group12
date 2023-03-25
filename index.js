const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //   /usuarios
  //   /usuarios/1
  //   /usuarios?active=1
  //   /usuarios  method=post body=name=Sergio&lastname=hidalgo

  //console.log(request);

  // 10x -> informativos
  // 20x -> respuestas sin errores
  // 30x -> redirecciones
  // 40x -> errores del cliente
  // 50x -> errores del servidor

  if (request.url === "/usuarios") {
    response.writeHead(200, { "content-type": "text/plain" });
    response.write("Esta es mi primera línea de respuesta");
    response.write("Esta es la segunda");
    response.end("La comunicación terminó");
  } else if (request.url === "/usuarios/html") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>CursosDev</h1>");
    response.end();
  } else if (request.url === "/usuarios/json") {
    response.writeHead(200, { "content-type": "application/json" });
    response.write('{ "name": "CursosDev" }');
    response.end();
  } else if (request.url === "/usuarios/pdf") {
    /*     response.writeHead(200, { "content-type": "application/pdf" });
    const content = fs.readFileSync(__dirname + "/public/manual.pdf");
    response.write(content);
    response.end(); */

    console.log("Inicio de lectura de archivo pdf");

    fs.readFile(__dirname + "/public/manual.pdf", (err, content) => {
      if (err) {
        console.log("An error happened");
        response.writeHead(500, { "content-type": "text/plain" });
        response.end("An error happened");
      } else {
        response.writeHead(200, { "content-type": "application/pdf" });
        response.write(content);
        response.end();
        console.log("Archivo enviado");
      }
    });

    console.log("Fin del código de lectura");
  } else {
    response.writeHead(200, { "content-type": "text/plain" });
    response.write("Path not found");
    response.end();
  }
});

server.listen(3000, () => console.log("Server is running on port 3000"));

//  http://localhost:3000
//  http://127.0.0.1:3000
