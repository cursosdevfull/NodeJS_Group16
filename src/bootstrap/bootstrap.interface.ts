export interface IBootstrap {
  initialize(): Promise<boolean | Error>;
}
