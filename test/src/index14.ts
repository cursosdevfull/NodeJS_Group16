import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const users = await manager.getRepository(UserEntity).find();
      console.log("Users: ", users);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
