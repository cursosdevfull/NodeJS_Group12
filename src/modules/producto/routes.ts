import express, { Router } from "express";

class ProductoRouter {
  private router: express.Router = Router();

  constructor() {
    this.handleRoutes();
  }

  getHandleRouter() {
    return this.router;
  }

  private handleRoutes() {
    this.router.get("/", (req, res) => {
      console.log("GET /");
      res.send("GET /");
    });

    this.router.get("/:id", (req, res) => {
      console.log("GET /:id");
      res.send(`GET /${+req.params.id * 20}`);
    });

    this.router.post("/", (req, res) => {
      console.log("POST /");
      res.send("POST /");
    });

    this.router.put("/:id", (req, res) => {
      console.log("PUT /:id");
      res.send("PUT /:id");
    });

    this.router.delete("/:id", (req, res) => {
      console.log("DELETE /:id");
      res.send("DELETE /:id");
    });
  }
}

export default new ProductoRouter().getHandleRouter();
