import { Course } from "../course";

export interface CourseRepository {
  createCourse(course: Course): Promise<void>;
  updateCourse(course: Course): Promise<void>;
  deleteCourse(course: Course): Promise<void>;
  listCourses(): Promise<Course[]>;
  getCourseById(courseId: string): Promise<Course>;
  getCoursesByPage(page: number, pageSize: number): Promise<Course[]>;
}
