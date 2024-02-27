import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

export class CourseGetByPage {
  constructor(private readonly repository: CourseRepository) {}

  async execute(page: number, pageSize: number): Promise<Course[]> {
    return await this.repository.getByPage(page, pageSize);
  }
}
