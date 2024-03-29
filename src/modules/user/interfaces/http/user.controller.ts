import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import RedisBootstrap from '../../../../bootstrap/Redis.bootstrap';
import { IError } from '../../../../core/error/error.interface';
import { Parameters } from '../../../../helpers/Parameters';
import { UserApplication } from '../../application/user.application';
import { User, UserProperties, UserUpdateProperties } from '../../domain/user';
import { UserFactory } from '../../domain/user.factory';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserGetByPageDto } from './dtos/user-get-by-page.dto';
import { UserGetOneDto } from './dtos/user-get-one.dto';

export class UserController {
  constructor(private readonly application: UserApplication) {}

  async insert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password, roles, photo } = req.body;

    const userCreatedDto = new UserCreateDto();
    userCreatedDto.name = name;
    userCreatedDto.lastname = lastname;
    userCreatedDto.email = email;
    userCreatedDto.password = password;
    userCreatedDto.roles = roles;
    userCreatedDto.photo = photo;

    const errors = await validate(userCreatedDto);

    if (errors.length > 0) {
      const err: IError = new Error();
      err.message = 'Validation error';
      err.stack = JSON.stringify(errors);
      err.status = 411;

      return next(err);
    }
    const propertiesUser: UserProperties = {
      name,
      lastname,
      email,
      password,
      roles,
      photo,
    };

    const userFactoryResult = UserFactory.create(propertiesUser);
    if (userFactoryResult.isErr()) {
      return next(userFactoryResult.error);
    }
    const objUser = userFactoryResult.value;

    const userCreateResult = await this.application.create(objUser);
    if (userCreateResult.isErr()) {
      return next(userCreateResult.error);
    }

    return res.status(201).json(userCreateResult.value);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const userGetOneDto = new UserGetOneDto();
    userGetOneDto.id = id;

    const errors = await validate(userGetOneDto);

    if (errors.length > 0) {
      const err: IError = new Error();
      err.message = 'Validation error';
      err.stack = JSON.stringify(errors);
      err.status = 411;

      return next(err);
    }
    const getOneResult = await this.application.get(id);
    if (getOneResult.isErr()) {
      return next(getOneResult.error);
    }

    console.log('getOneResult.value', getOneResult.value);

    return res.status(200).json(getOneResult.value);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const getAllResult = await this.application.getAll();
    if (getAllResult.isErr()) {
      console.log('getAllResult.error', getAllResult.error);
      return next(getAllResult.error);
    }

    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(getAllResult.value));

    // https://curso-nodejs12.s3.amazonaws.com/photos/profile/1685199698467.jpg

    const results = (getAllResult.value as User[]).map((user: User) => {
      if (user.properties().photo === null) return user.properties();

      const userClone = { ...user.properties() };
      userClone.photo = `${Parameters.STORAGE_URL}/${userClone.photo}`;
      return userClone;
    });

    return res.status(200).json(results);
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const { page, pageSize } = req.params;

    const userGetByPage = new UserGetByPageDto();
    userGetByPage.page = +page;
    userGetByPage.pageSize = +pageSize;

    const errors = await validate(userGetByPage);

    if (errors.length > 0) {
      const err: IError = new Error();
      err.message = 'Validation error';
      err.stack = JSON.stringify(errors);
      err.status = 411;

      return next(err);
    }
    const getByPageResult = await this.application.getByPage(+page, +pageSize);
    if (getByPageResult.isErr()) {
      return next(getByPageResult.error);
    }

    return res.status(200).json(getByPageResult.value);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, lastname, password } = req.body;

    const propertiesUser: UserUpdateProperties = {
      name,
      lastname,
      password,
    };

    const userResult = await this.application.get(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user: User = userResult.value as User;

    user.update(propertiesUser);

    const updateResult = await this.application.update(user);
    if (updateResult.isErr()) {
      return next(updateResult.error);
    }

    return res.status(201).json(updateResult.value);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const userResult = await this.application.get(id);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user: User = userResult.value as User;
    user.delete();

    const updateResult = await this.application.delete(user);
    if (updateResult.isErr()) {
      return next(updateResult.error);
    }

    return res.status(201).json(updateResult.value);
  }
}
