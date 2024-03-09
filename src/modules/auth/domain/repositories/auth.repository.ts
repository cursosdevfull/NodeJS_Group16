export interface AuthRepository {
  verifyRecaptcha(recaptchaCode: string): Promise<boolean>;
}
