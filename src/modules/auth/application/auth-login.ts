import { IError } from "@core/interfaces/ierror.interface";
import { UserService } from "@user/application/user.service";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { ITokens, TokensDto } from "./dtos/tokens.dto";

export type TResultTokens = Result<ITokens, IError>;

@injectable()
export class AuthLogin {
  constructor(
    @inject("AuthRepository")
    private readonly repositoryAuth: AuthRepository,
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(
    auth: Auth,
    ignore2FA: boolean = false,
    ignoreRecaptcha: boolean = false
  ): Promise<TResultTokens> {
    const { recaptchaCode } = auth.properties;

    const isRecaptchaValid = await this.repositoryAuth.verifyRecaptcha(
      recaptchaCode
    );

    if (!ignoreRecaptcha && !isRecaptchaValid) {
      const error: IError = new Error("Invalid recaptcha");
      error.status = 411;
      return err(error);
    }

    const userResult = await this.repository.getByEmail(auth.properties.email);
    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value;

    if (!ignore2FA && !user.properties.secret) {
      const error: IError = new Error("2FA not enabled");
      error.status = 411;
      return err(error);
    }

    const password = auth.properties.password;
    const encryptedPassword = user.properties.password;

    const isPasswordValid = UserService.comparePassword(
      password,
      encryptedPassword
    );

    if (!isPasswordValid) {
      const error: IError = new Error("Invalid password");
      error.status = 411;
      return err(error);
    }

    return ok(TokensDto.generateTokens(user, false));
  }
}
