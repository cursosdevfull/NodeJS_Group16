import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AuthRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  refreshToken: string;
}
