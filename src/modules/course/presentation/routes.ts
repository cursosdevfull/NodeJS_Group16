import {
  CourseGetAll,
  CourseGetById,
  CourseGetByPage,
  CourseSave,
} from "@course/application";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { CourseInfrastructure } from "@course/infrastructure/course.infrastructure";
import { Router } from "express";

import { CourseController } from "./controller";

export class CourseRoute {
  readonly router: Router;

  constructor(private readonly controller: CourseController) {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put("/:courseId", this.controller.update.bind(this.controller));
    this.router.delete(
      "/:courseId",
      this.controller.delete.bind(this.controller)
    );
    /* this.router.get("/", (req: Request, res: Response) => {
      this.controller.getAll(req, res);
    }); */
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.get(
      "/:courseId",
      this.controller.getById.bind(this.controller)
    );
    this.router.get(
      "/page/:page/size/:pageSize",
      this.controller.getByPage.bind(this.controller)
    );
  }
}

const courseRepository: CourseRepository = new CourseInfrastructure();

const courseSave = new CourseSave(courseRepository);
const courseGetAll = new CourseGetAll(courseRepository);
const courseGetById = new CourseGetById(courseRepository);
const courseGetByPage = new CourseGetByPage(courseRepository);

const controller = new CourseController(
  courseSave,
  courseGetAll,
  courseGetById,
  courseGetByPage
);

export default new CourseRoute(controller).router;