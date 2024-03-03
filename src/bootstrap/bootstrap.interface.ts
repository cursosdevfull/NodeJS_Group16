import { DataSource } from "typeorm";

export type TInitialize = boolean | DataSource | Error;

export interface IBootstrap {
  initialize(): Promise<TInitialize>;
}
