import { validate } from "class-validator";
import { Request, Response } from "express";

import { UserApplication } from "../../application/user.application";
import { UserCreateDto } from "./dtos/user-create.dto";

export class UserController {
  constructor(private readonly application: UserApplication) {}

  async insert(req: Request, res: Response) {
    const user = req.body;

    const userCreatedDto = new UserCreateDto();
    userCreatedDto.name = user.name;
    userCreatedDto.lastname = user.lastname;
    userCreatedDto.email = user.email;
    userCreatedDto.password = user.password;
    userCreatedDto.roles = user.roles;
    userCreatedDto.photo = user.photo;

    const errors = await validate(userCreatedDto);

    if (errors.length > 0) {
      return res.status(411).json(errors);
    } else {
      await this.application.create(user);
      res.status(201).send();
    }
  }
}
