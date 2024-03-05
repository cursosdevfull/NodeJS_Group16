export interface BaseRepository<T> {
  save(course: T): Promise<void>;
  getAll(): Promise<T[]>;
  getById(courseId: string): Promise<T>;
  getByPage(page: number, pageSize: number): Promise<T[]>;
}
