import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const results = await manager.query("call sp_list_users()");
      console.log("results: ", results);
      console.log("users", results[0]);
    } catch (error) {}
  })
  .catch((error) => {
    console.error(error);
  });