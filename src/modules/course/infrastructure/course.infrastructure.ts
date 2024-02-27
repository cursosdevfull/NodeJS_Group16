import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

import { CourseMemory } from "./course.memory";
import { CourseDto } from "./dtos/course.dto";

export class CourseInfrastructure implements CourseRepository {
  private readonly courseMemory = new CourseMemory();

  async save(course: Course) {
    const courseEntity = CourseDto.fromDomainToData(course);
    return Promise.resolve(this.courseMemory.save(courseEntity));
  }

  async getAll() {
    const coursesEntity = await this.courseMemory.getAll();
    return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );
  }

  async getById(courseId: string) {
    const courseEntity = await this.courseMemory.getById(courseId);
    return Promise.resolve(CourseDto.fromDataToDomain(courseEntity) as Course);
  }

  async getByPage(page: number, pageSize: number) {
    const coursesEntity = await this.courseMemory.getByPage(page, pageSize);
    return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );
  }
}
