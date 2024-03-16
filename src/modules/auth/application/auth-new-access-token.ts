import { TYPES } from "@container";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { inject, injectable } from "inversify";

import { ITokens, TokensDto } from "./dtos/tokens.dto";

@injectable()
export class AuthGetNewAccessToken {
  constructor(
    @inject(TYPES.UserRepository) private readonly repository: UserRepository
  ) {}

  async execute(refreshToken: string): Promise<ITokens> {
    const user = await this.repository.getByRefreshToken(refreshToken);

    if (!user) throw new Error("User not found");

    user.update({ refreshToken: TokensDto.generateRefreshToken() });
    this.repository.save(user);

    return TokensDto.generateTokens(user);
  }
}
