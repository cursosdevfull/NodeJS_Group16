import { CourseEntity } from "@course/infrastructure/entities/course.entity";
import { RoleEntity } from "@role/infrastructure/entities/role.entity";
import { UserEntity } from "@user/infrastructure/entities/user.entity";

export class Parameters {
  static get port(): number {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  static get dbConfig() {
    return {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 9200,
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_PASSWORD || "12345",
      database: process.env.DB_NAME || "db",
      entities: [CourseEntity, UserEntity, RoleEntity],
      synchronize: process.env.DB_SYNCHRONIZE
        ? process.env.DB_SYNCHRONIZE === "true"
          ? true
          : false
        : true,
      logging: process.env.DB_LOGGING
        ? process.env.DB_LOGGING === "true"
          ? true
          : false
        : true,
      poolSize: process.env.DB_POOL_SIZE
        ? Number(process.env.DB_POOL_SIZE)
        : 10,
      maxQueryExecutionTime: process.env.DB_MAX_QUERY_EXECUTION_TIME
        ? Number(process.env.DB_MAX_QUERY_EXECUTION_TIME)
        : 1000,
    };
  }
}
