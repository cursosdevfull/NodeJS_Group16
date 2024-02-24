import { Course } from "@course/domain/course";
import { plainToInstance } from "class-transformer";

import { CourseStatus } from "../../domain/course";
import { CourseEntity } from "../entities/course.entity";

export class CourseDto {
  static fromDomainToData(course: Course): CourseEntity {
    const courseEntity = plainToInstance(CourseEntity, course.properties);

    /*const courseEntity = new CourseEntity();
    courseEntity.id = course.properties.courseId;
    courseEntity.title = course.properties.title;
    courseEntity.slug = course.properties.slug;
    courseEntity.status = course.properties.status;
    courseEntity.createdAt = course.properties.createdAt;
    courseEntity.updatedAt = course.properties.updatedAt;
    courseEntity.deletedAt = course.properties.deletedAt;*/

    return courseEntity;
  }

  static fromDataToDomain(
    entity: CourseEntity | CourseEntity[]
  ): Course | Course[] {
    if (Array.isArray(entity)) {
      return entity.map((item) => this.fromDataToDomain(item)) as Course[];
    }

    const course = new Course({
      courseId: entity.id,
      title: entity.title,
      slug: entity.slug,
      status: entity.status as CourseStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });

    return course;
  }
}
