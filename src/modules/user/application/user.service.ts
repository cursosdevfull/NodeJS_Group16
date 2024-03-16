import * as bcrypt from "bcryptjs";
import crypto from "crypto";

export class UserService {
  static encryptPassword(password: string): string {
    crypto.createHash("sha256");

    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
