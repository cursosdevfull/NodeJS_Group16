import { HandlerErrorGeneral, HandlerErrorNotFound } from '@core/handle-errors/errors';
import { Parameters } from '@core/parameters';
import { CourseResolver } from '@course/presentation/resolvers/course.resolver';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express, { Application } from 'express';
import { buildSchema } from 'type-graphql';

import { RedisBootstrap } from './bootstrap/redis.bootstrap';
import AuthRouter from './modules/auth/presentation/routes';
import { interceptor } from './modules/core/interceptors/interceptor';
import CourseRouter from './modules/course/presentation/routes';
import UserRouter from './modules/user/presentation/routes';
import { swaggerDocs as SwaggerDocs } from './swagger/swagger';

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.init();
  }

  async init() {
    this.middlewares();
    this.interceptors();
    await this.mountGraphQL();
    this.mountSwagger();
    this.mountRoutes();
    this.mountHelpers();
    this.mountErrorHandlers();
  }

  middlewares() {
    this.expressApp.use(cors());
    this.expressApp.use(express.json());
    this.expressApp.use(
      express.urlencoded({ extended: true /*limit: "200mb"*/ })
    );
  }

  interceptors() {
    this.expressApp.use(interceptor);
  }

  mountSwagger() {
    SwaggerDocs(this.expressApp, Parameters.port);
  }

  async mountGraphQL() {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [CourseResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    await server.start();

    server.applyMiddleware({ app: this.expressApp, path: "/graphql" });
  }

  mountRoutes() {
    this.expressApp.use("/course", CourseRouter);
    this.expressApp.use("/user", UserRouter);
    this.expressApp.use("/auth", AuthRouter);
  }

  mountHelpers() {
    this.expressApp.get("/invalidate-cache", (req, res) => {
      RedisBootstrap.reset();
      res.send("Cache invalidado");
    });
  }

  mountErrorHandlers() {
    this.expressApp.use(HandlerErrorNotFound);
    this.expressApp.use(HandlerErrorGeneral);
  }
}

export default new App().expressApp;
