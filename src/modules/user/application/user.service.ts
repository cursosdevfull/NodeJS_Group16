import * as bcrypt from "bcryptjs";

export class UserService {
  static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
