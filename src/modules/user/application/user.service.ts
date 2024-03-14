import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class UserService {
  static encryptPassword(password: string): string {
    console.log("=====================================================");
    console.log("inside encryptPassword");
    console.log("password", password);

    crypto.createHash("sha256");

    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password: string, encryptedPassword: string): boolean {
    console.log("inside comparePassword");
    console.log("password", password);
    console.log("encryptedPassword", encryptedPassword);
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
