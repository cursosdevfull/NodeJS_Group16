import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";

import { CourseMemory } from "./course.memory";
import { CourseDto } from "./dtos/course.dto";

export class CourseInfrastructure implements CourseRepository {
  private readonly courseMemory = new CourseMemory();

  async createCourse(course: Course) {
    const courseEntity = CourseDto.fromDomainToData(course);
    return Promise.resolve(this.courseMemory.createCourse(courseEntity));
  }

  async updateCourse(course: Course) {
    const courseEntity = CourseDto.fromDomainToData(course);
    return Promise.resolve(this.courseMemory.updateCourse(courseEntity));
  }

  async deleteCourse(course: Course) {
    const courseEntity = CourseDto.fromDomainToData(course);
    return Promise.resolve(this.courseMemory.deleteCourse(courseEntity));
  }

  async listCourses() {
    const coursesEntity = await this.courseMemory.listCourses();
    return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );
  }

  async getCourseById(courseId: string) {
    const courseEntity = await this.courseMemory.getCourseById(courseId);
    return Promise.resolve(CourseDto.fromDataToDomain(courseEntity) as Course);
  }

  async getCoursesByPage(page: number, pageSize: number) {
    const coursesEntity = await this.courseMemory.getCoursesByPage(
      page,
      pageSize
    );
    return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );
  }
}
