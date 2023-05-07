import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";

import { userRoutes } from "./modules/user/interfaces/http/user.routes";

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
    this.app.use("/user", userRoutes);
  }
}

const app = new App().app;

export { app };
