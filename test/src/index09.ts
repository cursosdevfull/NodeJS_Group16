import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);

      const car01 = new CarEntity();
      car01.brand = "Kia";
      car01.model = "Rio";
      car01.year = 2024;

      const car02 = new CarEntity();
      car02.brand = "Toyota";
      car02.model = "Corolla";
      car02.year = 2024;

      const user01 = new UserEntity();
      user01.name = "Joe Doe";
      user01.email = "joe1@email.com";
      user01.password = "12345";
      user01.cars = [car01, car02];
      const userSaved01 = await repoUser.save(user01);
      console.log("userSaved", userSaved01);

      const user02 = new UserEntity();
      user02.name = "Joe Doe";
      user02.email = "joe2@email.com";
      user02.password = "12345";
      user02.cars = [car01];
      const userSaved02 = await repoUser.save(user02);
      console.log("userSaved", userSaved02);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
