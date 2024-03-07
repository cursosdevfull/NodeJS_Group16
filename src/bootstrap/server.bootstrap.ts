import { Application } from "express";
import http from "http";

import { Parameters } from "../modules/core/parameters";
import { swaggerDocs as SwaggerDocs } from "../swagger/swagger";
import { IBootstrap, TInitialize } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  constructor(private readonly app: Application) {}

  initialize(): Promise<TInitialize> {
    const promise = new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = Parameters.port;

      server
        .listen(port)
        .on("listening", () => {
          console.log(`Server is listening on port ${port}`);
          SwaggerDocs(this.app, port);
          resolve(true);
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    return promise as Promise<boolean | Error>;
  }
}
