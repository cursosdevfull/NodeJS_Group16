class User {
  readonly userId = "1afa35b9-b32f-4594-9f4c-08d25180b727";
  protected readonly password = "GFVzLXXWmWKLVKi";

  /*private getPassword() {
        return this.password
    }*/
}

class Developer extends User {
  getPasswordLength() {
    //this.password = "abc"
    return this.password.length;
  }

  getUserId() {
    return this.userId;
  }
}

class DeveloperCloud extends Developer {
  getPassword() {
    return this.password;
  }
}

const user = new User();
//console.log(user.password)

const developerCloud = new DeveloperCloud();
console.log(developerCloud.getPassword());
