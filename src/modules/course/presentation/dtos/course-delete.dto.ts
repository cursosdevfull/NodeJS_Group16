import { IsNotEmpty, IsUUID } from "class-validator";

export class CourseDeleteDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
