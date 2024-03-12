import * as qr from "qrcode";
import * as speakeasy from "speakeasy";

export class UserService {
  static async generateQRAndSecret() {
    const secret = speakeasy.generateSecret();
    const qrCode = await qr.toDataURL(secret.otpauth_url);

    return { secret: secret.base32, qrCode };
  }

  static verify2fa(secret: string, token: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
  }
}
