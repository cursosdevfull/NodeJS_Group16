import express, { Application, Request, Response } from "express";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().expressApp;
