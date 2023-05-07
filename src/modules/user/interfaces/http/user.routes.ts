import { Router } from "express";

import { UserApplication } from "../../application/user.application";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserInfrastructure } from "../../infrastructure/user.infrastructure";
import { UserController } from "./user.controller";

const userInfrastructure: UserRepository = new UserInfrastructure();
const userApplication = new UserApplication(userInfrastructure);
const userController = new UserController(userApplication);

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  addRoutes() {
    this.router.post("/", userController.insert.bind(userController));
  }
}

export const userRoutes = new UserRoutes().router;
