import 'reflect-metadata';

import dotenv from 'dotenv';

import app from './app';
import { TInitialize } from './bootstrap/bootstrap.interface';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';
import { RedisBootstrap } from './bootstrap/redis.bootstrap';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

dotenv.config();

(async () => {
  const server = new ServerBootstrap(app);
  const database = new DatabaseBootstrap();
  const redis = new RedisBootstrap();

  try {
    const listPromise: Array<Promise<TInitialize>> = [
      server.initialize(),
      database.initialize(),
      redis.initialize(),
    ];

    await Promise.all(listPromise);
    console.log("Server and database are running");
  } catch (err) {
    console.error("Error happened", err);
    database.close();
    redis.close();
    process.exit(1);
  }
})();
