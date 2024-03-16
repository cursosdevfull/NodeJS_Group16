import { Parameters } from "@core/parameters";
import { injectable } from "inversify";

import { AuthRepository } from "../domain/repositories/auth.repository";

@injectable()
export class AuthInfrastructure implements AuthRepository {
  async verifyRecaptcha(recaptchaCode: string): Promise<boolean> {
    const secret = Parameters.recaptchaSecretKeyPrivate;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaCode}`
    );
    const data = await response.json();

    return data.success;
  }
}
