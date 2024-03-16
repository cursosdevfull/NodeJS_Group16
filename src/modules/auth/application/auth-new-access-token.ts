import { IError } from "@core/interfaces/ierror.interface";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

import { ITokens, TokensDto } from "./dtos/tokens.dto";

export type TResultTokens = Result<ITokens, IError>;

@injectable()
export class AuthGetNewAccessToken {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(refreshToken: string): Promise<TResultTokens> {
    const userResult = await this.repository.getByRefreshToken(refreshToken);
    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value;

    user.update({ refreshToken: TokensDto.generateRefreshToken() });
    this.repository.save(user);

    return ok(TokensDto.generateTokens(user));
  }
}
