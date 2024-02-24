enum FREQUENCY {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

enum STATUS_SCHEDULE {
  PUBLISHED = "published",
  DRAFT = "draft",
}

enum TYPE_SCHEDULE {
  PRO = "pro",
  BASIC = "basic",
}

interface ISchedule {
  scheduleId: string;
  courseId: string;
  title: string;
  image: string;
  summary: string;
  slogan: string;
  dateStart: Date;
  hourStart: Date;
  hourEnd: Date;
  duration: number;
  frequency: FREQUENCY;
  type: TYPE_SCHEDULE;
  status: STATUS_SCHEDULE;
  whatLearn: string[];
  requirements: string[];
  content: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const day = "MONDAY";
const freq: FREQUENCY = FREQUENCY[day as keyof typeof FREQUENCY];
//const freq: FREQUENCY = day as FREQUENCY
