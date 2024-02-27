import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

export class CourseGetById {
  constructor(private readonly repository: CourseRepository) {}

  async execute(courseId: string): Promise<Course> {
    return await this.repository.getById(courseId);
  }
}
