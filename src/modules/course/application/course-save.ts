import { TYPES } from "@container";
import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { inject, injectable } from "inversify";

@injectable()
export class CourseSave {
  constructor(
    @inject(TYPES.CourseRepository)
    private readonly repository: CourseRepository
  ) {}

  async execute(course: Course): Promise<void> {
    return await this.repository.save(course);
  }
}
