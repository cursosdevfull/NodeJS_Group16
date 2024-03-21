import { ControllerBase } from "@core/presentation/controller-base";
import {
  CourseGetAll,
  CourseGetById,
  CourseGetByPage,
  CourseSave,
} from "@course/application";
import { Course, CourseProperties } from "@course/domain/course";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

import { RedisBootstrap } from "../../../bootstrap/redis.bootstrap";
import { CourseCreateDto } from "./dtos/course-create.dto";
import { CourseDeleteDto } from "./dtos/course-delete.dto";
import { CourseGetByIdDto } from "./dtos/course-get-by-id";
import { CourseGetByPageDto } from "./dtos/course-get-by-page";
import { CourseResponseDto } from "./dtos/course-response.dto";
import { CourseUpdateDto } from "./dtos/course-update.dto";

@injectable()
export class CourseController extends ControllerBase {
  constructor(
    @inject("CourseSave") private readonly courseSave: CourseSave,
    @inject("CourseGetAll") private readonly courseGetAll: CourseGetAll,
    @inject("CourseGetById") private readonly courseGetById: CourseGetById,
    @inject("CourseGetByPage")
    private readonly courseGetByPage: CourseGetByPage
  ) {
    super();
  }

  async create(req: Request, res: Response) {
    const { title, slug } = req.body;

    const errors = await this.validateParameters(CourseCreateDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    const courseId = uuidv4();

    const props: CourseProperties = {
      courseId,
      title,
      slug,
    };

    const course = new Course(props);
    const valueReturned = await this.courseSave.execute(course);
    res.json(valueReturned);
  }

  async update(req: Request, res: Response) {
    const { courseId } = req.params;
    const body = req.body;

    const errors = await this.validateParameters(CourseUpdateDto, {
      ...req.body,
      courseId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const course = await this.courseGetById.execute(courseId);
    course.update(body);
    const valueReturned = await this.courseSave.execute(course);
    res.json(valueReturned);
  }

  async delete(req: Request, res: Response) {
    const { courseId } = req.params;

    const errors = await this.validateParameters(CourseDeleteDto, {
      courseId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const course = await this.courseGetById.execute(courseId);
    course.delete();
    const valueReturned = await this.courseSave.execute(course);
    res.json(valueReturned);
  }

  async getAll(req: Request, res: Response) {
    const courses = await this.courseGetAll.execute();
    const response = CourseResponseDto.fromDomainToResponse(courses);

    await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(response));

    console.log("Response from database");
    res.json(response);
  }

  async getById(req: Request, res: Response) {
    const { courseId } = req.params;

    const errors = await this.validateParameters(CourseGetByIdDto, {
      courseId,
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const course = await this.courseGetById.execute(courseId);
    res.json(CourseResponseDto.fromDomainToResponse(course));
  }

  async getByPage(req: Request, res: Response) {
    const { page, pageSize } = req.params;

    const errors = await this.validateParameters(CourseGetByPageDto, {
      page: Number(page),
      pageSize: Number(pageSize),
    });
    if (errors) {
      return res.status(400).json(errors);
    }

    const courses = await this.courseGetByPage.execute(
      parseInt(page),
      parseInt(pageSize)
    );
    res.json(CourseResponseDto.fromDomainToResponse(courses));
  }
}
