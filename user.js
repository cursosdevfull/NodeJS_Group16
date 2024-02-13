const Database = require("./database");

class User {
  database;

  constructor() {
    this.connect();
  }

  connect(username, password, host) {
    this.database = new Database(username, password, host);
  }

  insert(name) {
    if (name.length < 3) throw "Name is too short";
    this.database.insert(name.toLowerCase());
  }

  list() {
    return this.database.list();
  }
}

module.exports = User;
