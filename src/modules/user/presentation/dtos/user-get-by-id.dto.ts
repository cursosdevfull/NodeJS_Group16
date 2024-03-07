import { IsNotEmpty } from "class-validator";

export class UserGetByIdDto {
  @IsNotEmpty()
  userId: number;
}
