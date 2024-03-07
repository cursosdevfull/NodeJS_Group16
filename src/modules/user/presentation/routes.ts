import {
  UserGetAll,
  UserGetById,
  UserGetByPage,
  UserSave,
} from "@user/application";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { UserInfrastructure } from "@user/infrastructure/user.infrastructure";
import { Router } from "express";

import { UserController } from "./controller";

export class UserRoute {
  readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put("/:userId", this.controller.update.bind(this.controller));
    this.router.get("/:userId", this.controller.getById.bind(this.controller));
    this.router.delete(
      "/:userId",
      this.controller.delete.bind(this.controller)
    );
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.get(
      "/page/:page/size/:pageSize",
      this.controller.getByPage.bind(this.controller)
    );
  }
}

const userRepository: UserRepository = new UserInfrastructure();

const userSave = new UserSave(userRepository);
const userGetAll = new UserGetAll(userRepository);
const userGetById = new UserGetById(userRepository);
const userGetByPage = new UserGetByPage(userRepository);

const controller = new UserController(
  userSave,
  userGetById,
  userGetAll,
  userGetByPage
);

export default new UserRoute(controller).router;
