import { Course } from "@course/domain/course";
import { plainToInstance } from "class-transformer";

export class CourseResponse {
  courseId: string;
  title: string;
  slug: string;
}

export class CourseResponseDto {
  static fromDomainToResponse(
    entity: Course | Course[]
  ): CourseResponse | CourseResponse[] {
    if (Array.isArray(entity)) {
      return entity.map((item) =>
        this.fromDomainToResponse(item)
      ) as CourseResponse[];
    }

    return plainToInstance(
      CourseResponse,
      entity.properties /*{
      excludeExtraneousValues: true,
    }*/
    );
  }
}
