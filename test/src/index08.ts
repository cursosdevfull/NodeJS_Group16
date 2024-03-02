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

      const user = new UserEntity();
      user.name = "Joe Doe";
      user.email = "joe6@email.com";
      user.password = "12345";
      user.cars = [car01, car02];
      const userSaved = await repoUser.save(user);

      console.log("userSaved", userSaved);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
