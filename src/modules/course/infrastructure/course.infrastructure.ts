import { Course } from "@course/domain/course";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { DatabaseBootstrap } from "src/bootstrap/database.bootstrap";
import { IsNull } from "typeorm";

import { CourseDto } from "./dtos/course.dto";
import { CourseEntity } from "./entities/course.entity";

export class CourseInfrastructure implements CourseRepository {
  async save(course: Course) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    const courseEntity = CourseDto.fromDomainToData(course);

    await repository.save(courseEntity);
  }

  async getAll() {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    const coursesEntity = await repository.find({
      where: { deletedAt: IsNull() },
    });
    return CourseDto.fromDataToDomain(coursesEntity) as Course[];
  }

  async getById(courseId: string) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    const courseEntity = await repository.findOne({
      where: { courseId, deletedAt: IsNull() },
    });
    return CourseDto.fromDataToDomain(courseEntity) as Course;
  }

  async getByPage(page: number, pageSize: number) {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(CourseEntity);
    const [courseEntities, total] = await repository.findAndCount({
      where: { deletedAt: IsNull() },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return CourseDto.fromDataToDomain(courseEntities) as Course[];
  }
}
