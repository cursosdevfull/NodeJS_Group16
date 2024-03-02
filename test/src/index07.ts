import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);

      const car = new CarEntity();
      car.brand = "Hyundai";
      car.model = "Santa Fe";
      car.year = 2024;

      const user = new UserEntity();
      user.name = "Joe Doe";
      user.email = "joe5@email.com";
      user.password = "12345";
      user.car = car;
      const userSaved = await repoUser.save(user);

      console.log("userSaved", userSaved);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
