import { UserRepository } from "@user/domain/repositories/user.repository";

import { ITokens, TokensDto } from "./dtos/tokens.dto";

export class AuthGetNewAccessToken {
  constructor(private readonly repository: UserRepository) {}

  async execute(refreshToken: string): Promise<ITokens> {
    const user = await this.repository.getByRefreshToken(refreshToken);

    if (!user) throw new Error("User not found");

    user.update({ refreshToken: TokensDto.generateRefreshToken() });
    this.repository.save(user);

    return TokensDto.generateTokens(user);
  }
}
