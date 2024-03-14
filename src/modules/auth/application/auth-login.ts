import { UserService } from '@user/application/user.service';
import { UserRepository } from '@user/domain/repositories/user.repository';

import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { ITokens, TokensDto } from './dtos/tokens.dto';

export class AuthLogin {
  constructor(
    private readonly repository: UserRepository,
    private readonly repositoryAuth: AuthRepository
  ) {}

  async execute(
    auth: Auth,
    ignore2FA: boolean = false,
    ignoreRecaptcha: boolean = false
  ): Promise<ITokens> {
    console.log("auth", auth.properties);

    const { recaptchaCode } = auth.properties;

    const isRecaptchaValid = await this.repositoryAuth.verifyRecaptcha(
      recaptchaCode
    );

    console.log("isRecaptchaValid", isRecaptchaValid);
    console.log("ignoreRecaptcha", ignoreRecaptcha);

    if (!ignoreRecaptcha && !isRecaptchaValid)
      throw new Error("Invalid recaptcha");

    const user = await this.repository.getByEmail(auth.properties.email);

    if (!user) throw new Error("User not found");

    if (!ignore2FA && !user.properties.secret)
      throw new Error("2FA not enabled");

    const password = auth.properties.password;
    const encryptedPassword = user.properties.password;

    console.log("password", password);
    console.log("encryptedPassword", encryptedPassword);

    const isPasswordValid = UserService.comparePassword(
      password,
      encryptedPassword
    );

    console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) throw new Error("Invalid password");

    return TokensDto.generateTokens(user, false);
  }
}
