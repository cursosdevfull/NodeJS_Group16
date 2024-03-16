import { TYPES } from "@container";
import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { inject, injectable } from "inversify";

@injectable()
export class CourseGetById {
  constructor(
    @inject(TYPES.CourseRepository)
    private readonly repository: CourseRepository
  ) {}

  async execute(courseId: string): Promise<Course> {
    return await this.repository.getById(courseId);
  }
}
