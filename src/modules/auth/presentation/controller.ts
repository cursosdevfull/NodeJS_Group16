import { ControllerBase } from '@core/presentation/controller-base';
import { UserGetById, UserSave } from '@user/application';
import { UserService } from '@user/application/user.service';
import { User, UserProperties } from '@user/domain/roots/user';
import { UserCreateDto } from '@user/presentation/dtos/user-create.dto';
import { Request, Response } from 'express';

import { AuthLogin } from '../application/auth-login';
import { AuthGetNewAccessToken } from '../application/auth-new-access-token';
import { TokensDto } from '../application/dtos/tokens.dto';
import { Auth } from '../domain/auth';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRefreshTokenDto } from './dtos/auth-refresh-token';
import { UserService as service } from './user.service';

export class AuthController extends ControllerBase {
  constructor(
    private readonly authLogin: AuthLogin,
    private readonly authGetNewAccessToken: AuthGetNewAccessToken,
    private readonly userSave: UserSave,
    private readonly userGetById: UserGetById
  ) {
    super();
  }

  async login(req: Request, res: Response) {
    const { email, password, recaptchaCode } = req.body;
    //const recaptchaCode = "";

    const errors = await this.validateParameters(AuthLoginDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    console.log("body", req.body);

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

  async enable2fa(req: Request, res: Response) {
    const { token, secret } = req.body;
    const userId = res.locals.userId;

    const isValid = service.verify2fa(secret, token);
    if (!!!isValid) return res.status(400).json({ message: "Invalid token" });

    const user = await this.userGetById.execute(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.update({ secret });
    await this.userSave.execute(user);

    res.status(200).json({ message: "2fa enabled" });
  }

  async verify2fa(req: Request, res: Response) {
    const { token } = req.body;
    const userId = res.locals.userId;

    const user = await this.userGetById.execute(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = service.verify2fa(user.properties.secret, token);
    if (!!!isValid) return res.status(400).json({ message: "Invalid token" });

    const tokens = TokensDto.generateTokens(user);

    res.status(200).json(tokens);
  }
}
