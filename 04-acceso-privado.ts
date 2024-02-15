class User {
  private id: string;
  name: string;
  email: string;
  private password: string;

  constructor() {
    this.id = "1afa35b9-b32f-4594-9f4c-08d25180b727";
    this.name = "Karen";
    this.email = "karen@email.com";
    this.password = "gIV2Fy4We9b2CYN";
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
console.log(user);
/*user.password = "kUKJQBybjRT1yxX"
user.id = "abcd"
console.log("password", user.password)
console.log("id", user.id)*/
