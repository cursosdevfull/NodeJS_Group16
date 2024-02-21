type TSTATUS = "READY" | "NEXT";

// Contexto: Course
class Course {
  courseId: string;
  title: string;
  status: TSTATUS;

  constructor(title: string, status: TSTATUS) {
    this.title = title;
    this.status = status;
    this.courseId = new Date().getTime().toString();
  }
}

// Contexto: Schedule
class Course2 {
  courseId: string;
  constructor(courseId: string) {
    this.courseId = courseId;
  }
}

class Schedule {
  scheduleId: string;
  course: Course2;
  dateStart: Date;
  duration: number;
  title: string;
  syllabus: Array<string>;
  requeriments: Array<string>;

  constructor(
    course: Course2,
    dateStart: Date,
    duration: number,
    title: string,
    syllabus: Array<string>,
    requerimients: Array<string>
  ) {
    this.course = course;
    this.dateStart = dateStart;
    this.duration = duration;
    this.title = title;
    this.syllabus = syllabus;
    this.requeriments = requerimients;
    this.scheduleId = new Date().getTime().toString();
  }
}
