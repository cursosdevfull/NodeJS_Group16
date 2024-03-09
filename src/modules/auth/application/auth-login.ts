import { UserService } from "@user/application/user.service";
import { UserRepository } from "@user/domain/repositories/user.repository";

import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { ITokens, TokensDto } from "./dtos/tokens.dto";

export class AuthLogin {
  constructor(
    private readonly repository: UserRepository,
    private readonly repositoryAuth: AuthRepository
  ) {}

  async execute(auth: Auth): Promise<ITokens> {
    const { recaptchaCode } = auth.properties;

    const isRecaptchaValid = await this.repositoryAuth.verifyRecaptcha(
      recaptchaCode
    );

    if (!isRecaptchaValid) throw new Error("Invalid recaptcha");

    const user = await this.repository.getByEmail(auth.properties.email);

    if (!user) throw new Error("User not found");

    const password = auth.properties.password;
    const encryptedPassword = user.properties.password;

    const isPasswordValid = await UserService.comparePassword(
      password,
      encryptedPassword
    );

    if (!isPasswordValid) throw new Error("Invalid password");

    return TokensDto.generateTokens(user);
  }
}
