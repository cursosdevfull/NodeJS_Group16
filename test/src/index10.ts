import { AppDataSource } from "./data-source";
import { CarEntity } from "./entity/Car";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoUser = AppDataSource.getRepository(UserEntity);
      const users = await repoUser.find({ relations: ["cars"] });
      console.log("users", JSON.stringify(users, null, "\t"));

      const repoCar = AppDataSource.getRepository(CarEntity);
      const cars = await repoCar.find({ relations: ["users"] });
      console.log("cars", JSON.stringify(cars, null, "\t"));
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
