class Database {
  private static readonly protocol = "https";

  static getUrlConnection(
    host: string,
    username: string,
    password: string,
    schema: string
  ) {
    return `${this.protocol}://${host}/${username}:${password}/${schema}`;
  }

  static getProtocol() {
    return this.protocol;
  }

  returnCurrentProtocol() {
    return Database.protocol;
  }
}

const database = new Database();
console.log(
  Database.getUrlConnection("localhost", "user01", "pass01", "product")
);
console.log(Database.getProtocol());
console.log(database.returnCurrentProtocol());
