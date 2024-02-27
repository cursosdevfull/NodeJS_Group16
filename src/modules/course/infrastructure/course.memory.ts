import { CourseEntity } from "./entities/course.entity";

export class CourseMemory {
  private courses: CourseEntity[] = [];

  async save(course: CourseEntity) {
    const courseMatched = this.courses.find(
      (c) => c.courseId === course.courseId
    );
    if (!courseMatched) {
      this.courses.push(course);
    } else {
      const index = this.courses.indexOf(courseMatched);
      this.courses[index] = course;
    }
  }

  async getAll() {
    const courses = this.courses.filter((course) => !course.deletedAt);
    return [...courses];
  }

  async getById(courseId: string) {
    return this.courses.find(
      (course) => course.courseId === courseId && !course.deletedAt
    );
  }

  async getByPage(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const courses = this.courses.filter((course) => !course.deletedAt);
    return [...courses.slice(start, end)];
  }
}
