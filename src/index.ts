import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

(async () => {
  const server = new ServerBootstrap(app);

  try {
    const listPromise: Array<Promise<boolean | Error>> = [server.initialize()];

    await Promise.all(listPromise);
  } catch (err) {
    console.error("Error happened 2", err);
  }
})();
