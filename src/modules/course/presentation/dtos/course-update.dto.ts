import { CourseStatus } from "@course/domain/course";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CourseUpdateDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  slug: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  status: string;
}
