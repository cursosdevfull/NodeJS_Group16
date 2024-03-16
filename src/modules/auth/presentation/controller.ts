import { IError } from "@core/interfaces/ierror.interface";
import { ControllerBase } from "@core/presentation/controller-base";
import { UserGetById, UserSave } from "@user/application";
import { UserService } from "@user/application/user.service";
import { User, UserProperties } from "@user/domain/roots/user";
import { UserCreateDto } from "@user/presentation/dtos/user-create.dto";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { AuthLogin } from "../application/auth-login";
import { AuthGetNewAccessToken } from "../application/auth-new-access-token";
import { TokensDto } from "../application/dtos/tokens.dto";
import { Auth } from "../domain/auth";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthRefreshTokenDto } from "./dtos/auth-refresh-token";
import { UserService as service } from "./user.service";

@injectable()
export class AuthController extends ControllerBase {
  constructor(
    @inject("AuthLogin") private readonly authLogin: AuthLogin,
    @inject("AuthGetNewAccessToken")
    private readonly authGetNewAccessToken: AuthGetNewAccessToken,
    @inject("UserSave") private readonly userSave: UserSave,
    @inject("UserGetById") private readonly userGetById: UserGetById
  ) {
    super();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password, recaptchaCode } = req.body;

    const errors = await this.validateParameters(AuthLoginDto, req.body);
    if (errors) {
      const error: IError = new Error("Invalid parameters");
      error.status = 411;
      error.stack = JSON.stringify(errors);
      return next(error);
    }

    const auth: Auth = new Auth(email, password, recaptchaCode);
    const valueResulted = await this.authLogin.execute(auth);

    if (valueResulted.isErr()) {
      return next(valueResulted.error);
    }

    res.json(valueResulted.value);
  }

  async getNewAccessToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    const errors = await this.validateParameters(AuthRefreshTokenDto, req.body);
    if (errors) {
      const error: IError = new Error("Invalid parameters");
      error.status = 400;
      error.stack = JSON.stringify(errors);
      return next(error);
    }

    const valueReturned = await this.authGetNewAccessToken.execute(
      refreshToken
    );

    if (valueReturned.isErr()) {
      return next(valueReturned.error);
    }

    res.json(valueReturned.value);
  }

  async register(req: Request, res: Response) {
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
    await this.userSave.execute(user);

    const auth: Auth = new Auth(email, password, "");
    const tokens = await this.authLogin.execute(auth, true, true);
    const { secret, qrCode } = await service.generateQRAndSecret();

    res.json({ ...tokens, secret, qrCode });
  }

  async enable2fa(req: Request, res: Response, next: NextFunction) {
    const { token, secret } = req.body;
    const userId = res.locals.userId;

    const isValid = service.verify2fa(secret, token);
    if (!!!isValid) return res.status(400).json({ message: "Invalid token" });

    const userResult = await this.userGetById.execute(userId);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;

    user.update({ secret });
    await this.userSave.execute(user);

    res.status(200).json({ message: "2fa enabled" });
  }

  async verify2fa(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    const userId = res.locals.userId;

    const userResult = await this.userGetById.execute(userId);
    if (userResult.isErr()) {
      return next(userResult.error);
    }

    const user = userResult.value;

    const isValid = service.verify2fa(user.properties.secret, token);
    if (!!!isValid) {
      const objError: IError = new Error("Invalid token");
      objError.status = 411;
      return next(objError);
    }

    const tokens = TokensDto.generateTokens(user);

    res.status(200).json(tokens);
  }
}
