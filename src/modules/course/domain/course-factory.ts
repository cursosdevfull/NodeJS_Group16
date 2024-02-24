import { TextLongVO } from "@core/domain/value-objects/text-long.vo";
import { Course, CourseProperties } from "@course/domain/course";
import { CourseIdVO } from "@course/domain/value-objects/course-id.vo";

export class CourseFactory {
  static create(props: CourseProperties) {
    CourseIdVO.create(props.courseId);
    TextLongVO.create(
      props.title,
      5,
      "Title must be at least 5 characters long"
    );
    TextLongVO.create(props.slug, 5, "Slug must be at least 5 characters long");

    return new Course(props);
  }
}
