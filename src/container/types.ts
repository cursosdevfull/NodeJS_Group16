export const TYPES = {
  AuthRepository: Symbol.for("AuthRepository"),
  AuthLogin: Symbol.for("AuthLogin"),
  AuthGetNewAccessToken: Symbol.for("AuthGetNewAccessToken"),
  AuthController: Symbol.for("AuthController"),
  UserRepository: Symbol.for("UserRepository"),
  UserGetAll: Symbol.for("UserGetAll"),
  UserGetById: Symbol.for("UserGetById"),
  UserGetByPage: Symbol.for("UserGetByPage"),
  UserSave: Symbol.for("UserSave"),
  UserController: Symbol.for("UserController"),
  CourseRepository: Symbol.for("CourseRepository"),
  CourseGetAll: Symbol.for("CourseGetAll"),
  CourseGetById: Symbol.for("CourseGetById"),
  CourseGetByPage: Symbol.for("CourseGetByPage"),
  CourseSave: Symbol.for("CourseSave"),
  CourseController: Symbol.for("CourseController"),
};
