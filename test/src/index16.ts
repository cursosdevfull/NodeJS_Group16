import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const users = await manager.query("SELECT * FROM user");

      console.log("Users: ", users);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });
