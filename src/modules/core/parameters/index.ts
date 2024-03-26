import { CourseEntity } from "../../course/infrastructure/entities/course.entity";
import { RoleEntity } from "../../role/infrastructure/entities/role.entity";
import { UserEntity } from "../../user/infrastructure/entities/user.entity";

export class Parameters {
  static get port(): number {
    return Number(process.env.PORT);
  }

  static get dbConfig() {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CourseEntity, UserEntity, RoleEntity],
      synchronize: process.env.DB_SYNCHRONIZE === "true" ? true : false,
      logging: process.env.DB_LOGGING === "true" ? true : false,
      poolSize: Number(process.env.DB_POOL_SIZE),
      maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME),
    };
  }

  static get jwtConfig() {
    return {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_EXPIRES_IN),
    };
  }

  static get recaptchaSecretKeyPrivate(): string {
    return process.env.RECAPTCHA_SECRET_KEY_PRIVATE;
  }

  static get dbRedisConfig() {
    return {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    };
  }

  static get bucketName(): string {
    return process.env.BUCKET_NAME;
  }

  static get timeoutUrlPresigned(): number {
    return Number(process.env.TIMEOUT_URL_PRESIGNED);
  }
}
