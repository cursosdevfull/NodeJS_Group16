class User {
  readonly id: string;
  name: string;
  readonly email: string;
  private password: string;

  constructor() {
    this.id = "1afa35b9-b32f-4594-9f4c-08d25180b727";
    this.name = "Karen";
    this.email = "karen@email.com";
    this.password = "gIV2Fy4We9b2CYN";
  }

  changeEmail() {
    //this.email = "sergio@email.com"
  }

  changeRandomPassword() {
    const newPassword = this.password + (Math.random() * 100 + 1).toString();
    this.password = newPassword;
  }
}

const user = new User();
console.log("name", user.name);
console.log("email", user.email);
user.changeRandomPassword();
//user.id = "abcd"
console.log("id", user.id);
console.log(user);
/*user.password = "kUKJQBybjRT1yxX"
user.id = "abcd"
console.log("password", user.password)
console.log("id", user.id)*/
