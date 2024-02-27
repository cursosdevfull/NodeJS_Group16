import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

export class CourseSave {
  constructor(private readonly repository: CourseRepository) {}

  async execute(course: Course): Promise<void> {
    return await this.repository.save(course);
  }
}
