import CourseRouter from "@course/presentation/routes";
import express, { Application, NextFunction, Request, Response } from "express";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  middlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      express.urlencoded({ extended: true /*limit: "200mb"*/ })
    ); // querystring, qs
  }

  mountRoutes() {
    this.expressApp.use("/course", CourseRouter);
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
