import { Course } from '@course/domain/course';
import { CourseRepository } from '@course/domain/repositories/course.repository';

export class CourseCreate {
    constructor(private readonly repository: CourseRepository){}

    async execute(course: Course) {
        return this.repository.createCourse(course);
    }
}