import cors from "cors";
import express, { Application, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";

import ProductosRouter from "./modules/producto/routes";

interface Product {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

type Products = Product[];

const users = [
  { id: 1, name: "John", active: true },
  { id: 2, name: "Jane", active: false },
  { id: 3, name: "Mary", active: true },
  { id: 4, name: "Peter", active: false },
];

const products: Products = [];

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.handleHealthCheck();
    this.handleMiddlewares();
    this.handleRoutes();
  }

  handleHealthCheck() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("OK");
    });

    this.app.get("/health", (req: Request, res: Response) => {
      res.send("OK");
    });

    this.app.get("/healthz", (req: Request, res: Response) => {
      res.send("OK");
    });

    this.app.get("/healthcheck", (req: Request, res: Response) => {
      res.send("OK");
    });
  }

  handleMiddlewares() {
    const corsOptions = {
      origin: ["http://localhost:3000", "http://localhost:3001"],
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  handleRoutes() {
    this.app.use("/productos", ProductosRouter);

    this.app.post("/usuarios", this.listUsers);
    this.app.post("/usuarios/insert", this.insertUser);
    this.app.get("/usuarios", this.responseGet);
    this.app.get("/usuarios/html", this.responseHtml);
    this.app.get("/usuarios/json", this.responseJson);
    this.app.get("/usuarios/pdf", this.responsePdf);
    this.app.get("/usuarios/:active", this.filterUsersByActive);
  }

  listProducts(req: Request, res: Response) {
    if (products.length === 0) {
      return res.status(404).send("No products found");
    }
    res.json(products);
  }

  getOneProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    if (product) {
      return res.json(product);
    }
    res.status(404).send("Product not found");
  }

  insertProduct(req: Request, res: Response) {
    const { name, price, isAvailable } = req.body;
    const product = { id: products.length, name, price, isAvailable };
    products.push(product);
    res.json(product);
  }

  updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, isAvailable } = req.body;
    const product = products.find((product) => product.id === +id);

    if (product) {
      product.name = name;
      product.price = price;
      product.isAvailable = isAvailable;
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  }

  deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    if (product) {
      const index = products.indexOf(product);
      products.splice(index, 1);
      return res.json(product);
    }

    res.status(404).send("Product not found");
  }

  insertUser(req: Request, res: Response) {
    // name=John&active=true
    // {name: "John", active: true}
    // req.body
    const { name } = req.body;
    const user = { id: users.length, name, active: true };

    users.unshift(user);

    res.json(users);

    //res.writeHead(200, { "content-type": "application/json" });
    //res.end(JSON.stringify(users));

    //console.log(user);
    //res.writeHead(200, { "content-type": "text/plain" });
    //res.end("Comunicación con el método POST");
  }

  listUsers(req: Request, res: Response) {
    res
      //.status(200)
      //.type("text/plain")
      .send("Esta es mi primera línea de respuesta");

    /* res.writeHead(200, { "content-type": "text/plain" });
    res.write("Esta es mi primera línea de respuesta");
    res.write("Esta es la segunda");
    res.end("La comunicación terminó"); */
  }

  filterUsersByActive(req: Request, res: Response) {
    //const active = req.params.active
    const { active } = req.params;
    //console.log(typeof active);
    const filter = active === "1" ? true : false;

    const usersFiltered = users.filter((user) => user.active === filter);

    res.json(usersFiltered);
    //res.writeHead(200, { "content-type": "application/json" });
    //res.end(JSON.stringify(usersFiltered));
  }

  responseGet(req: Request, res: Response) {
    res.send("Comunicación con el método GET");
    //res.writeHead(200, { "content-type": "text/plain" });
    //res.end("Comunicación con el método GET");
  }

  responseHtml(req: Request, res: Response) {
    res.type("text/html").send("<h1>CursosDev</h1>");
    /*    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>CursosDev</h1>");
    res.end(); */
  }

  responseJson(req: Request, res: Response) {
    res.json({ name: "CursosDev" });

    /*     res.writeHead(200, { "content-type": "application/json" });
    res.write('{ "name": "CursosDev" }');
    res.end(); */
  }

  responsePdf(req: Request, res: Response) {
    const params = req.query;
    console.log(params);
    /*     response.writeHead(200, { "content-type": "application/pdf" });
          const content = fs.readFileSync(__dirname + "/public/manual.pdf");
          response.write(content);
          response.end(); */

    console.log("Inicio de lectura de archivo pdf");

    fs.readFile(__dirname + "/public/manual.pdf", (err, content) => {
      if (err) {
        console.log("An error happened");
        res.status(500).send("An error happened");
        //res.writeHead(500, { "content-type": "text/plain" });
        //res.end("An error happened");
      } else {
        res.type("application/pdf").send(content);
        /*         res.writeHead(200, { "content-type": "application/pdf" });
        res.write(content);
        res.end(); */
        console.log("Archivo enviado");
      }
    });

    console.log("Fin del código de lectura");
  }

  responseNotFound(req: Request, res: Response) {
    res.send("Path not found");
    /* res.writeHead(200, { "content-type": "text/plain" });
    res.write("Path not found");
    res.end(); */
  }
}

const app = new App().app;

export { app };