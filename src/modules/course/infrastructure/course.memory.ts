import { CourseEntity } from "./entities/course.entity";

export class CourseMemory {
  private courses: CourseEntity[] = [];

  async createCourse(course: CourseEntity) {
    this.courses.push(course);
  }

  async updateCourse(course: CourseEntity) {
    const index = this.courses.findIndex((c) => c.id === course.id);
    this.courses[index] = course;
  }

  async deleteCourse(course: CourseEntity) {
    const index = this.courses.findIndex((c) => c.id === course.id);
    this.courses[index] = course;
  }

  async listCourses() {
    return [...this.courses];
  }

  async getCourseById(courseId: string) {
    return this.courses.find((c) => c.id === courseId);
  }

  async getCoursesByPage(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return [...this.courses.slice(start, end)];
  }
}
