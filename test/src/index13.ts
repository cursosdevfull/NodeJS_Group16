import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const pageSize = 2;
      const page = 2;

      const [users, total] = await repoUser.findAndCount({
        take: pageSize,
        skip: page * pageSize,
      });

      console.log("Users: ", users);
      console.log("Total: ", total);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
