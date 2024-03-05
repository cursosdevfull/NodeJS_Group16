import { IsNotEmpty, IsUUID } from "class-validator";

export class CourseGetByIdDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
