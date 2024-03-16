import { AuthLogin } from "@auth/application/auth-login";
import { AuthGetNewAccessToken } from "@auth/application/auth-new-access-token";
import { AuthRepository } from "@auth/domain/repositories/auth.repository";
import { AuthInfrastructure } from "@auth/infrastructure/auth.infrastructure";
import { AuthController } from "@auth/presentation/controller";
import {
  CourseGetAll,
  CourseGetById,
  CourseGetByPage,
  CourseSave,
} from "@course/application";
import { CourseRepository } from "@course/domain/repositories/course.repository";
import { CourseInfrastructure } from "@course/infrastructure/course.infrastructure";
import { CourseController } from "@course/presentation/controller";
import {
  UserGetAll,
  UserGetById,
  UserGetByPage,
  UserSave,
} from "@user/application";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { UserInfrastructure } from "@user/infrastructure/user.infrastructure";
import { UserController } from "@user/presentation/controller";
import { Container } from "inversify";

const container = new Container();

container.bind<UserRepository>("UserRepository").to(UserInfrastructure);
container.bind<UserGetAll>("UserGetAll").to(UserGetAll);
container.bind<UserGetById>("UserGetById").to(UserGetById);
container.bind<UserGetByPage>("UserGetByPage").to(UserGetByPage);
container.bind<UserSave>("UserSave").to(UserSave);
container.bind<UserController>("UserController").to(UserController);

container.bind<AuthRepository>("AuthRepository").to(AuthInfrastructure);
container.bind<AuthLogin>("AuthLogin").to(AuthLogin);
container
  .bind<AuthGetNewAccessToken>("AuthGetNewAccessToken")
  .to(AuthGetNewAccessToken);
container.bind<AuthController>("AuthController").to(AuthController);

container.bind<CourseRepository>("CourseRepository").to(CourseInfrastructure);
container.bind<CourseGetAll>("CourseGetAll").to(CourseGetAll);
container.bind<CourseGetById>("CourseGetById").to(CourseGetById);
container.bind<CourseGetByPage>("CourseGetByPage").to(CourseGetByPage);
container.bind<CourseSave>("CourseSave").to(CourseSave);
container.bind<CourseController>("CourseController").to(CourseController);

export { container };
