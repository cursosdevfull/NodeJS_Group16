class Database {
  username;
  password;
  host;
  connectionString;

  users = [];

  constructor(username, password, host) {
    this.username = username;
    this.password = password;
    this.host = host;
    this.connectionString = `mongo://${host}/${username}@${password}`;
  }

  insert(name) {
    this.users.push(name);
  }

  list() {
    return this.users;
  }
}

module.exports = Database;
