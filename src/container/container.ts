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

import { TYPES } from "./types";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserInfrastructure);
container.bind<UserGetAll>(TYPES.UserGetAll).to(UserGetAll);
container.bind<UserGetById>(TYPES.UserGetById).to(UserGetById);
container.bind<UserGetByPage>(TYPES.UserGetByPage).to(UserGetByPage);
container.bind<UserSave>(TYPES.UserSave).to(UserSave);
container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthInfrastructure);
container.bind<AuthLogin>(TYPES.AuthLogin).to(AuthLogin);
container
  .bind<AuthGetNewAccessToken>(TYPES.AuthGetNewAccessToken)
  .to(AuthGetNewAccessToken);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

container
  .bind<CourseRepository>(TYPES.CourseRepository)
  .to(CourseInfrastructure);
container.bind<CourseGetAll>(TYPES.CourseGetAll).to(CourseGetAll);
container.bind<CourseGetById>(TYPES.CourseGetById).to(CourseGetById);
container.bind<CourseGetByPage>(TYPES.CourseGetByPage).to(CourseGetByPage);
container.bind<CourseSave>(TYPES.CourseSave).to(CourseSave);
container.bind<CourseController>(TYPES.CourseController).to(CourseController);

export { container };
