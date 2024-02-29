export class Parameters {
  static get port(): number {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }
}
