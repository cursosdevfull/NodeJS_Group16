import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new UserEntity();
    user.name = "Joe Doe";
    user.email = "joe@email.com";
    user.password = "12345";

    const car = new CarEntity();
    car.brand = "Toyota";
    car.model = "Corolla";
    car.year = 2019;

    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const repoCar = AppDataSource.getRepository(CarEntity);
      await repoUser.save(user);
      await repoCar.save(car);

      console.log("users", user);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
