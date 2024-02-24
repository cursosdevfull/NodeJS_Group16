import { CourseCreate } from "@course/application/course-create";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { CourseInfrastructure } from "@course/infrastructure/course.infrastructure";

import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { CourseProperties } from "./modules/course/domain/course";
import { CourseFactory } from "./modules/course/domain/course-factory";

const props: CourseProperties = {
  courseId: "01d6eae3-49ea-4144-aaf2-ef4da72d60d4",
  title: "NodeJS Pro",
  slug: "nodejs-pro",
};

const course = CourseFactory.create(props);

const courseRepository: CourseRepository = new CourseInfrastructure();
const courseCreate = new CourseCreate(courseRepository);

courseCreate.execute(course);
console.log("Course created", course);

(async () => {
  const server = new ServerBootstrap(app);

  try {
    const listPromise: Array<Promise<boolean | Error>> = [server.initialize()];

    await Promise.all(listPromise);
  } catch (err) {
    console.error("Error happened 2", err);
  }
})();
