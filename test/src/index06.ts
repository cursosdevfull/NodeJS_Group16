import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const repoCar = AppDataSource.getRepository(CarEntity);

      const car = new CarEntity();
      car.brand = "Hyundai";
      car.model = "Santa Fe";
      car.year = 2024;
      const carSaved = await repoCar.save(car);

      const user = new UserEntity();
      user.name = "Joe Doe";
      user.email = "joe4@email.com";
      user.password = "12345";
      user.car = carSaved;
      const userSaved = await repoUser.save(user);

      console.log("userSaved", userSaved);

      const userNew = new UserEntity();
      userNew.name = "Joe Doe";
      userNew.email = "joe5@email.com";
      userNew.password = "12345";
      userNew.car = carSaved;
      const userNewSaved = await repoUser.save(userNew);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
