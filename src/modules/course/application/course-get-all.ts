import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

export class CourseGetAll {
  constructor(private readonly repository: CourseRepository) {}

  async execute(): Promise<Course[]> {
    return await this.repository.getAll();
  }
}
