import { ControllerBase } from "@core/presentation/controller-base";
import { Request, Response } from "express";

import { AuthLogin } from "../application/auth-login";
import { AuthGetNewAccessToken } from "../application/auth-new-access-token";
import { Auth } from "../domain/auth";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthRefreshTokenDto } from "./dtos/auth-refresh-token";

export class AuthController extends ControllerBase {
  constructor(
    private readonly authLogin: AuthLogin,
    private readonly authGetNewAccessToken: AuthGetNewAccessToken
  ) {
    super();
  }

  async login(req: Request, res: Response) {
    const { email, password, recaptchaCode } = req.body;

    const errors = await this.validateParameters(AuthLoginDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    const auth: Auth = new Auth(email, password, recaptchaCode);
    const valueReturned = await this.authLogin.execute(auth);
    res.json(valueReturned);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const errors = await this.validateParameters(AuthRefreshTokenDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    const valueReturned = await this.authGetNewAccessToken.execute(
      refreshToken
    );
    res.json(valueReturned);
  }
}
