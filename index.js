const User = require("./user");

const user = new User();
//user.connect();
user.insert("Joe");
user.insert("Adam");
user.insert("Jolie");

const list = user.list();
console.log("list of users", list);
