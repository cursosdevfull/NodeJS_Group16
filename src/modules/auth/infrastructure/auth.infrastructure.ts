import { Parameters } from "@core/parameters";

import { AuthRepository } from "../domain/repositories/auth.repository";

export class AuthInfrastructure implements AuthRepository {
  async verifyRecaptcha(recaptchaCode: string): Promise<boolean> {
    const secret = Parameters.recaptchaSecretKeyPrivate;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaCode}`
    );
    const data = await response.json();
    console.log("data", data);

    return true;
  }
}
