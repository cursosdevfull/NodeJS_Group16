type TSTATUS = "READY" | "NEXT";

// Domain
class Course {
  courseId: string;
  title: string;
  status: TSTATUS;

  constructor(title: string, status: TSTATUS) {
    if (title.trim().length < 5) throw "Title must have 5 characters at least";

    this.title = title;
    this.status = status;
    this.courseId = new Date().getTime().toString();
  }
}

interface CourseRepository {
  insert(course: Course): void;
  findByTitle(title: string): boolean;
}

// Application
class CourseApplication {
  repository: CourseRepository = new CourseInfrastructure();

  create(course: Course): boolean {
    // Validar si existe ya el curso
    const match = this.repository.findByTitle(course.title);
    if (!match) {
      this.repository.insert(course);
      return true;
    }
    return false;
    // Si no existe, entonces lo creo
  }
}

// Infrastructure
class CourseEntity {
  idCourse: string;
  titleCourse: string;
  statusCourse: TSTATUS;
  createdAt: Date;

  constructor(idCourse: string, titleCourse: string, statusCourse: TSTATUS) {
    this.idCourse = idCourse;
    this.titleCourse = titleCourse;
    this.statusCourse = statusCourse;
    this.createdAt = new Date();
  }
}

class CourseInMemory {
  coursesEntity: Array<CourseEntity> = [];

  insert(courseEntity: CourseEntity) {
    this.coursesEntity.push(courseEntity);
  }

  findByTitle(title: string) {
    return this.coursesEntity.some(
      (courseEntity: CourseEntity) => courseEntity.titleCourse === title
    );
  }
}

class Broker {
  sentMessage(courseId: string, title: string) {
    // Acá se envía hacia un broker (Rabbitmq, Kafka, MQTT, SNS, etc)
  }
}

class CourseInfrastructure implements CourseRepository {
  persistent: CourseInMemory = new CourseInMemory();
  broker = new Broker();

  insert(course: Course) {
    const courseEntity: CourseEntity = new CourseEntity(
      course.courseId,
      course.title,
      course.status
    );
    this.persistent.insert(courseEntity);
    this.broker.sentMessage(courseEntity.idCourse, courseEntity.titleCourse);
  }

  findByTitle(title: string) {
    return this.persistent.findByTitle(title);
  }
}

const course = new Course("Angular", "READY");
console.log(course);
