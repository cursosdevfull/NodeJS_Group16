import { CourseGetAll, CourseSave } from "@course/application";
import { Course, CourseProperties } from "@course/domain/course";
import { CourseInfrastructure } from "@course/infrastructure/course.infrastructure";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

import { CourseRepository } from "../../domain/repositories/course.repository";
import { CourseRequestDto } from "../dtos/course-request.dto";

@Resolver(CourseRequestDto)
export class CourseResolver {
  @Mutation((returns) => CourseRequestDto)
  async createCourse(@Arg("title") title: string, @Arg("slug") slug: string) {
    const courseId = uuidv4();

    const props: CourseProperties = {
      courseId,
      title,
      slug,
    };

    const course = new Course(props);
    const courseRepository: CourseRepository = new CourseInfrastructure();
    const courseSave = new CourseSave(courseRepository);
    const valueReturned = await courseSave.execute(course);

    const instance = new CourseRequestDto();
    instance.title = title;
    instance.slug = slug;

    return instance;
  }

  @Query(() => [CourseRequestDto])
  async getAllCourses() {
    const courseRepository: CourseRepository = new CourseInfrastructure();
    const courseGetAll = new CourseGetAll(courseRepository);
    const valueReturned = await courseGetAll.execute();
    return valueReturned;
  }
}
