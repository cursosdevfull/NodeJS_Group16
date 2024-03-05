//export type CourseStatus = "draft" | "published";
export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface CourseRequired {
  courseId: string;
  title: string;
  slug: string;
}

export interface CourseOptional {
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type CourseProperties = CourseRequired & Partial<CourseOptional>;
export type CoursePropertiesToUpdate = Partial<
  Omit<CourseRequired, "courseId"> & Pick<CourseOptional, "status">
>;

export class Course {
  private readonly courseId: string;
  private title: string;
  private slug: string;
  private status: CourseStatus;
  private readonly createdAt!: Date;
  private updatedAt: Date | null | undefined;
  private deletedAt: Date | null | undefined;

  constructor(props: CourseProperties) {
    Object.assign(this, props);
    this.status = props.status || CourseStatus.DRAFT;
    this.createdAt = props.createdAt || new Date();
  }

  get properties() {
    return {
      courseId: this.courseId,
      title: this.title,
      slug: this.slug,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: CoursePropertiesToUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
