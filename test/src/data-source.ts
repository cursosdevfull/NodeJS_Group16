import { DataSource } from "typeorm";

import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 9200,
  username: "user",
  password: "12345",
  database: "db",
  synchronize: true,
  logging: true,
  entities: [UserEntity, CarEntity],
});
