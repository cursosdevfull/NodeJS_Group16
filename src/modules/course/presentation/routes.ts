import { container } from "@container";
import { AuthenticationMiddleware } from "@core/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "@core/middlewares/authorization.middleware";
import { Router } from "express";

import { CourseController } from "./controller";

export class CourseRoute {
  readonly router: Router;

  constructor(private readonly controller: CourseController) {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post(
      "/",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.create.bind(this.controller)
    );
    this.router.put(
      "/:courseId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.update.bind(this.controller)
    );
    this.router.delete(
      "/:courseId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.delete.bind(this.controller)
    );
    this.router.get(
      "/",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getAll.bind(this.controller)
    );
    this.router.get(
      "/:courseId",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getById.bind(this.controller)
    );
    this.router.get(
      "/page/:page/size/:pageSize",
      AuthenticationMiddleware.execute(),
      AuthorizationMiddleware.execute("ADMIN", "USER"),
      this.controller.getByPage.bind(this.controller)
    );
  }
}

/* const courseRepository: CourseRepository = new CourseInfrastructure();

const courseSave = new CourseSave(courseRepository);
const courseGetAll = new CourseGetAll(courseRepository);
const courseGetById = new CourseGetById(courseRepository);
const courseGetByPage = new CourseGetByPage(courseRepository);

const controller = new CourseController(
  courseSave,
  courseGetAll,
  courseGetById,
  courseGetByPage
); */

const controller = container.get<CourseController>("CourseController");

export default new CourseRoute(controller).router;
