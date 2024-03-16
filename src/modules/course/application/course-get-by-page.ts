import { TYPES } from '@container';
import { Course } from '@course/domain/course';
import { CourseRepository } from '@course/domain/repositories/course.repository';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseGetByPage {
  constructor(@inject(TYPES.CourseRepository) private readonly repository: CourseRepository) {}

  async execute(page: number, pageSize: number): Promise<Course[]> {
    return await this.repository.getByPage(page, pageSize);
  }
}
