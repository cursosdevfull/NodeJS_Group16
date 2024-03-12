import { UserGetById, UserSave } from "@user/application";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { UserInfrastructure } from "@user/infrastructure/user.infrastructure";
import { Router } from "express";

import { AuthenticationMiddleware } from "../../core/middlewares/authentication.middleware";
import { AuthLogin } from "../application/auth-login";
import { AuthGetNewAccessToken } from "../application/auth-new-access-token";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthController } from "./controller";

export class AuthRoute {
  readonly router: Router;

  constructor(private readonly controller: AuthController) {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post(
      "/get-new-access-token",
      this.controller.getNewAccessToken.bind(this.controller)
    );
    this.router.post(
      "/register",
      this.controller.register.bind(this.controller)
    );
    this.router.post(
      "/enable-2fa",
      AuthenticationMiddleware.execute(false),
      this.controller.enable2fa.bind(this.controller)
    );
    this.router.post(
      "/verify-2fa",
      AuthenticationMiddleware.execute(false),
      this.controller.verify2fa.bind(this.controller)
    );
  }
}

const userRepository: UserRepository = new UserInfrastructure();
const authRepository: AuthRepository = new AuthInfrastructure();

const authLogin = new AuthLogin(userRepository, authRepository);
const authGetNewAccessToken = new AuthGetNewAccessToken(userRepository);
const userSave = new UserSave(userRepository);
const userGetById = new UserGetById(userRepository);

const controller = new AuthController(
  authLogin,
  authGetNewAccessToken,
  userSave,
  userGetById
);

export default new AuthRoute(controller).router;
