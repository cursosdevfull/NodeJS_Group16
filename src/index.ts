import "reflect-metadata";

import app from "./app";
import { TInitialize } from "./bootstrap/bootstrap.interface";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

(async () => {
  const server = new ServerBootstrap(app);
  const database = new DatabaseBootstrap();

  try {
    const listPromise: Array<Promise<TInitialize>> = [
      server.initialize(),
      database.initialize(),
    ];

    await Promise.all(listPromise);
    console.log("Server and database are running");
  } catch (err) {
    console.error("Error happened 2", err);
    database.close();
    process.exit(1);
  }
})();
