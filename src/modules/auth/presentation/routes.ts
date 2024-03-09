import { UserRepository } from "@user/domain/repositories/user.repository";
import { UserInfrastructure } from "@user/infrastructure/user.infrastructure";
import { Router } from "express";

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
  }
}

const userRepository: UserRepository = new UserInfrastructure();
const authRepository: AuthRepository = new AuthInfrastructure();

const authLogin = new AuthLogin(userRepository, authRepository);
const authGetNewAccessToken = new AuthGetNewAccessToken(userRepository);

const controller = new AuthController(authLogin, authGetNewAccessToken);

export default new AuthRoute(controller).router;
