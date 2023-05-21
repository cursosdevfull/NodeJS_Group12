import { Router } from "express";

import { AuthenticationGuard } from "../../../../core/middlewares/authentication.guard";
import { AuthorizationGuard } from "../../../../core/middlewares/authorization.guard";
import { CacheMiddleware } from "../../../../core/middlewares/cache.middleware";
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
    this.router.get("/:id", userController.getOne.bind(userController));
    this.router.get(
      "/page/:page/:pageSize",
      userController.getByPage.bind(userController)
    );
    this.router.get(
      "/",
      AuthenticationGuard.canActive,
      AuthorizationGuard.canActive("ADMIN", "MEDIC"),
      CacheMiddleware.build("user"),
      userController.getAll.bind(userController)
    );
    this.router.put("/:id", userController.update.bind(userController));
    this.router.delete("/:id", userController.delete.bind(userController));
  }
}

export const userRoutes = new UserRoutes().router;
