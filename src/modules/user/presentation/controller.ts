import { IError } from "@core/interfaces/ierror.interface";
import { ControllerBase } from "@core/presentation/controller-base";
import { UserGetById, UserGetByPage, UserSave } from "@user/application";
import { UserService } from "@user/application/user.service";
import { User, UserProperties } from "@user/domain/roots/user";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { UserGetAll } from "../application/user-get-all";
import { UserCreateDto } from "./dtos/user-create.dto";
import { UserDeleteDto } from "./dtos/user-delete.dto";
import { UserGetByIdDto } from "./dtos/user-get-by-id.dto";
import { UserGetByPageDto } from "./dtos/user-get-by-page";
import { UserResponseDto } from "./dtos/user-response.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";

@injectable()
export class UserController extends ControllerBase {
  constructor(
    @inject("UserSave") private readonly userSave: UserSave,
    @inject("UserGetById") private readonly userGetById: UserGetById,
    @inject("UserGetAll") private readonly userGetAll: UserGetAll,
    @inject("UserGetByPage") private readonly userGetByPage: UserGetByPage
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const { name, lastname, email, password, roles } = req.body;

    const errors = await this.validateParameters(UserCreateDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    const props: UserProperties = {
      name,
      lastname,
      email,
      password: UserService.encryptPassword(password),
      roles,
    };

    const user = new User(props);
    const valueReturned = await this.userSave.execute(user);
    res.json(valueReturned);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const body = req.body;

    const errors = await this.validateParameters(UserUpdateDto, {
      ...req.body,
      userId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const userResult = await this.userGetById.execute(+userId);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;

    user.update(body);
    const valueReturned = await this.userSave.execute(user);
    res.json(valueReturned);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    const errors = await this.validateParameters(UserGetByIdDto, {
      userId,
    });
    if (errors) {
      const objError: IError = new Error("Invalid parameters");
      objError.status = 411;
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const userResult = await this.userGetById.execute(+userId);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    res.json(UserResponseDto.fromDomainToResponse(user));
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    const errors = await this.validateParameters(UserDeleteDto, {
      userId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const userResult = await this.userGetById.execute(+userId);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;
    user.delete();
    const valueResult = await this.userSave.execute(user);
    if (valueResult.isErr()) {
      return next(valueResult.error);
    }

    res.json(valueResult.value);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const usersResult = await this.userGetAll.execute();
    if (usersResult.isErr()) {
      return next(usersResult.error);
    }

    const users = usersResult.value;

    res.json(UserResponseDto.fromDomainToResponse(users));
  }

  async getByPage(req: Request, res: Response, next: NextFunction) {
    const { page, pageSize } = req.params;

    const errors = await this.validateParameters(UserGetByPageDto, {
      page: Number(page),
      pageSize: Number(pageSize),
    });
    if (errors) {
      const objError: IError = new Error("Invalid parameters");
      objError.status = 411;
      objError.stack = JSON.stringify(errors);
      return next(objError);
    }

    const usersResult = await this.userGetByPage.execute(
      parseInt(page),
      parseInt(pageSize)
    );

    if (usersResult.isErr()) {
      return next(usersResult.error);
    }

    const users = usersResult.value;

    res.json(UserResponseDto.fromDomainToResponse(users));
  }
}
