import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { DatabaseBootstrap } from "src/bootstrap/database.bootstrap";
import { IsNull } from "typeorm";

import { CourseMemory } from "./course.memory";
import { CourseDto } from "./dtos/course.dto";
import { CourseEntity } from "./entities/course.entity";

export class CourseInfrastructure implements CourseRepository {
  private readonly courseMemory = new CourseMemory();

  async save(course: Course) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    const courseEntity = CourseDto.fromDomainToData(course);

    await repository.save(courseEntity);

    //return Promise.resolve(this.courseMemory.save(courseEntity));
  }

  async getAll() {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    //const coursesEntity = await this.courseMemory.getAll();
    const coursesEntity = await repository.find({
      where: { deletedAt: IsNull() },
    });
    /*return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );*/
    return CourseDto.fromDataToDomain(coursesEntity) as Course[];
  }

  async getById(courseId: string) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    //const courseEntity = await this.courseMemory.getById(courseId);
    const courseEntity = await repository.findOne({
      where: { courseId, deletedAt: IsNull() },
    });
    //return Promise.resolve(CourseDto.fromDataToDomain(courseEntity) as Course);
    return CourseDto.fromDataToDomain(courseEntity) as Course;
  }

  async getByPage(page: number, pageSize: number) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    //const coursesEntity = await this.courseMemory.getByPage(page, pageSize);
    const [courseEntities, total] = await repository.findAndCount({
      where: { deletedAt: IsNull() },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    /*return Promise.resolve(
      CourseDto.fromDataToDomain(coursesEntity) as Course[]
    );*/
    return CourseDto.fromDataToDomain(courseEntities) as Course[];
  }
}
