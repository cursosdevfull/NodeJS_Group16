import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const car = new CarEntity();
    car.brand = "Toyota";
    car.model = "Corolla";
    car.year = 2019;

    const user = new UserEntity();
    user.name = "Joe Doe";
    user.email = "joe2@email.com";
    user.password = "12345";
    user.car = car;

    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const repoCar = AppDataSource.getRepository(CarEntity);
      await repoCar.save(car);
      await repoUser.save(user);

      console.log("users", user);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
