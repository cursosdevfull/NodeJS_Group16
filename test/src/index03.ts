import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/SinRelaciones/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new UserEntity();
    user.name = "John Doe";
    user.email = "john@email.com";
    user.password = "12345";

    try {
      const repository = AppDataSource.getRepository(UserEntity);
      const users = await repository.findOne({ where: { id: 1 } });

      console.log("users", users);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
