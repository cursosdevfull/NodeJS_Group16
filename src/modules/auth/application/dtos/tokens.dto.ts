import { Parameters } from "@core/parameters";
import { User } from "@user/domain/roots/user";
import { sign, verify } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export class TokensDto {
  static generateAccessToken(user: User): string {
    const payload = {
      name: user.properties.name,
      lastname: user.properties.lastname,
      roles: user.properties.roles,
    };

    return sign(payload, Parameters.jwtConfig.secret, {
      expiresIn: Parameters.jwtConfig.expiresIn,
    });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static generateTokens(user: User): ITokens {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = user.properties.refreshToken;

    return {
      accessToken,
      refreshToken,
    };
  }

  static verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, Parameters.jwtConfig.secret, (error, decoded) => {
        if (error) return reject(error);
        return resolve(decoded);
      });
    });
    /*     try {
      const result = verify(token, Parameters.jwtConfig.secret);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    } */
  }
}
