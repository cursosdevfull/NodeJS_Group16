import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const users = await manager
        .createQueryBuilder()
        .select("user.name, count(*) as total")
        .from(UserEntity, "user")
        .where("user.id = :id", { id: 4 })
        //.andWhere("user.name = :name", { name: "Jimena Alvarez" })
        .orWhere("user.name = :name", { name: "Joe Doe" })
        .orderBy("user.name", "DESC")
        //.addOrderBy("user.email", "DESC")
        .groupBy("user.name")
        .having("count(*) > 1")
        .getRawMany();
      console.log("Users: ", users);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
