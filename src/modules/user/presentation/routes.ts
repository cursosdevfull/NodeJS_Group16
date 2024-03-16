import { container } from "@container";
import { AuthenticationMiddleware } from "@core/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "@core/middlewares/authorization.middleware";
import { Router } from "express";

import { UserController } from "./controller";

export class UserRoute {
  readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post(
      "/",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.create.bind(this.controller)
    );
    this.router.put(
      "/:userId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.update.bind(this.controller)
    );
    this.router.get(
      "/:userId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getById.bind(this.controller)
    );
    this.router.delete(
      "/:userId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.delete.bind(this.controller)
    );
    this.router.get(
      "/",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getAll.bind(this.controller)
    );
    this.router.get(
      "/page/:page/size/:pageSize",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getByPage.bind(this.controller)
    );
  }
}

/* const userRepository: UserRepository = new UserInfrastructure();

const userSave = new UserSave(userRepository);
const userGetAll = new UserGetAll(userRepository);
const userGetById = new UserGetById(userRepository);
const userGetByPage = new UserGetByPage(userRepository);

const controller = new UserController(
  userSave,
  userGetById,
  userGetAll,
  userGetByPage
); */

const controller = container.get<UserController>("UserController");

export default new UserRoute(controller).router;
