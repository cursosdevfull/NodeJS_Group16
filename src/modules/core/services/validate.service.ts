import { validate, ValidationError } from "class-validator";

export class ValidateService {
  static async validate(dto: object) {
    const errors: ValidationError[] = await validate(dto);
    return errors.length > 0 ? errors : null;
  }
}
