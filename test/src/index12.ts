import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const user01 = new UserEntity();
      user01.name = "José Martinez";
      user01.email = "jose@email.com";
      user01.password = "123456";
      await repoUser.save(user01);

      const user02 = new UserEntity();
      user02.name = "Jimena Alvarez";
      user02.email = "jimena@email.com";
      user02.password = "123456";
      await repoUser.save(user02);

      const user03 = new UserEntity();
      user03.name = "Carmela Nieto";
      user03.email = "carmela@email.com";
      user03.password = "123456";
      await repoUser.save(user03);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
