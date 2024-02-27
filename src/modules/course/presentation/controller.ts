import {
  CourseGetAll,
  CourseGetById,
  CourseGetByPage,
  CourseSave,
} from "@course/application";
import { Course, CourseProperties } from "@course/domain/course";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { CourseResponseDto } from "./dtos/course-response.dto";

export class CourseController {
  constructor(
    private readonly courseSave: CourseSave,
    private readonly courseGetAll: CourseGetAll,
    private readonly courseGetById: CourseGetById,
    private readonly courseGetByPage: CourseGetByPage
  ) {
    //this.getAll = this.getAll.bind(this); // apply, call
  }

  async create(req: Request, res: Response) {
    const { title, slug } = req.body;
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
