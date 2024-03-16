import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { inject, injectable } from "inversify";

@injectable()
export class CourseGetAll {
  constructor(
    @inject("CourseRepository")
    private readonly repository: CourseRepository
  ) {}

  async execute(): Promise<Course[]> {
    return await this.repository.getAll();
  }
}
