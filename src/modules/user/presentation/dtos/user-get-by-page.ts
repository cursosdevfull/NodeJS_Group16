import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UserGetByPageDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  pageSize: number;
}
