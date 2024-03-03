import {
  CourseGetAll,
  CourseGetById,
  CourseGetByPage,
  CourseSave,
} from "@course/application";
import { Course, CourseProperties } from "@course/domain/course";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { CourseRequestDto } from "./dtos/course-request.dto";
import { CourseResponseDto } from "./dtos/course-response.dto";

export class CourseController {
  constructor(
    private readonly courseSave: CourseSave,
    private readonly courseGetAll: CourseGetAll,
    private readonly courseGetById: CourseGetById,
    private readonly courseGetByPage: CourseGetByPage
  ) {}

  async create(req: Request, res: Response) {
    const { title, slug } = req.body;

    const dtoRequest = new CourseRequestDto();
    dtoRequest.title = title;
    dtoRequest.slug = slug;

    const errors: ValidationError[] = await validate(dtoRequest, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });
    if (errors.length > 0) {
      return res.status(411).json({ errors });
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

    const course = await this.courseGetById.execute(courseId);
    course.update(body);
    const valueReturned = await this.courseSave.execute(course);
    res.json(valueReturned);
  }

  async delete(req: Request, res: Response) {
    const { courseId } = req.params;

    const course = await this.courseGetById.execute(courseId);
    course.delete();
    const valueReturned = await this.courseSave.execute(course);
    res.json(valueReturned);
  }

  async getAll(req: Request, res: Response) {
    const courses = await this.courseGetAll.execute();
    res.json(CourseResponseDto.fromDomainToResponse(courses));
  }

  async getById(req: Request, res: Response) {
    const { courseId } = req.params;
    const course = await this.courseGetById.execute(courseId);
    res.json(CourseResponseDto.fromDomainToResponse(course));
  }

  async getByPage(req: Request, res: Response) {
    const { page, pageSize } = req.params;
    const courses = await this.courseGetByPage.execute(
      parseInt(page),
      parseInt(pageSize)
    );
    res.json(CourseResponseDto.fromDomainToResponse(courses));
    //return await this.courseGetByPage.execute(page, pageSize);
  }
}
