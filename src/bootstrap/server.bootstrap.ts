import { Application } from "express";
import http from "http";

import { IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  constructor(private readonly app: Application) {}

  initialize(): Promise<boolean | Error> {
    const promise = new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(3000)
        .on("listening", () => {
          console.log("Server is listening on port 3000");
          resolve(true);
        })
        .on("error", (err) => {
          //console.error("Error happened", err);
          reject(err);
        });
    });

    return promise as Promise<boolean | Error>;
  }
}
