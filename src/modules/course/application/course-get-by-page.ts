import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { inject, injectable } from "inversify";

@injectable()
export class CourseGetByPage {
  constructor(
    @inject("CourseRepository") private readonly repository: CourseRepository
  ) {}

  async execute(page: number, pageSize: number): Promise<Course[]> {
    return await this.repository.getByPage(page, pageSize);
  }
}
