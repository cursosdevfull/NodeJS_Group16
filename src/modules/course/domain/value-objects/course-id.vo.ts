import { validate } from "uuid";

export class CourseIdVO {
  private readonly _value: string;

  private constructor(courseId: string) {
    this._value = courseId;
  }

  static create(courseId: string) {
    if (!validate(courseId)) throw new Error("Invalid courseId");
    return new CourseIdVO(courseId);
  }

  get value() {
    return this._value;
  }
}
