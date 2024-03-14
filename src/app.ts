import { CourseResolver } from '@course/presentation/resolvers/course.resolver';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { buildSchema } from 'type-graphql';

import AuthRouter from './modules/auth/presentation/routes';
import CourseRouter from './modules/course/presentation/routes';
import UserRouter from './modules/user/presentation/routes';

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountGraphQL();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  middlewares() {
    this.expressApp.use(cors());
    this.expressApp.use(express.json());
    this.expressApp.use(
      express.urlencoded({ extended: true /*limit: "200mb"*/ })
    ); // querystring, qs
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

  mountErrorHandlers() {
    this.expressApp.use(
      "**",
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(404).send("Path not found");
      }
    );
  }
}

export default new App().expressApp;
