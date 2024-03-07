import { Course } from '@course/domain/course';
import { Expose, plainToInstance } from 'class-transformer';

export class CourseResponse {
  @Expose()
  courseId: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  status: string;
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

    return plainToInstance(CourseResponse, entity.properties, {
      strategy: "excludeAll",
    });
  }
}
