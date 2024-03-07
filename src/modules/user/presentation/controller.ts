import { ControllerBase } from "@core/presentation/controller-base";
import { UserGetById, UserGetByPage, UserSave } from "@user/application";
import { User, UserProperties } from "@user/domain/roots/user";
import { Request, Response } from "express";

import { UserGetAll } from "../application/user-get-all";
import { UserCreateDto } from "./dtos/user-create.dto";
import { UserDeleteDto } from "./dtos/user-delete.dto";
import { UserGetByIdDto } from "./dtos/user-get-by-id.dto";
import { UserGetByPageDto } from "./dtos/user-get-by-page";
import { UserResponseDto } from "./dtos/user-response.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";

export class UserController extends ControllerBase {
  constructor(
    private readonly userSave: UserSave,
    private readonly userGetById: UserGetById,
    private readonly userGetAll: UserGetAll,
    private readonly userGetByPage: UserGetByPage
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
      password,
      roles,
    };

    const user = new User(props);
    const valueReturned = await this.userSave.execute(user);
    res.json(valueReturned);
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params;
    const body = req.body;

    const errors = await this.validateParameters(UserUpdateDto, {
      ...req.body,
      userId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const user = await this.userGetById.execute(+userId);
    user.update(body);
    const valueReturned = await this.userSave.execute(user);
    res.json(valueReturned);
  }

  async getById(req: Request, res: Response) {
    const { userId } = req.params;

    const errors = await this.validateParameters(UserGetByIdDto, {
      userId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const user = await this.userGetById.execute(+userId);
    res.json(UserResponseDto.fromDomainToResponse(user));
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    const errors = await this.validateParameters(UserDeleteDto, {
      userId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const user = await this.userGetById.execute(+userId);
    user.delete();
    const valueReturned = await this.userSave.execute(user);
    res.json(valueReturned);
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userGetAll.execute();
    res.json(UserResponseDto.fromDomainToResponse(users));
  }

  async getByPage(req: Request, res: Response) {
    const { page, pageSize } = req.params;

    const errors = await this.validateParameters(UserGetByPageDto, {
      page: Number(page),
      pageSize: Number(pageSize),
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const users = await this.userGetByPage.execute(
      parseInt(page),
      parseInt(pageSize)
    );
    res.json(UserResponseDto.fromDomainToResponse(users));
  }
}
