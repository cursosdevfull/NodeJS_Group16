import { Course } from "../course";

export interface CourseRepository {
  save(course: Course): Promise<void>;
  getAll(): Promise<Course[]>;
  getById(courseId: string): Promise<Course>;
  getByPage(page: number, pageSize: number): Promise<Course[]>;
}
