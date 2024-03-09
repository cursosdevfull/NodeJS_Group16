export class Auth {
  private readonly email: string;
  private readonly password: string;
  private readonly recaptchaCode: string;

  constructor(email: string, password: string, recaptchaCode: string) {
    if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null)
      throw new Error("Invalid email format");
    if (password.length < 5)
      throw new Error("Password must be at least 5 characters long");

    this.email = email;
    this.password = password;
    this.recaptchaCode = recaptchaCode;
  }

  get properties() {
    return {
      email: this.email,
      password: this.password,
      recaptchaCode: this.recaptchaCode,
    };
  }
}
