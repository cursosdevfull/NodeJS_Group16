import { ValidateService } from "@core/services/validate.service";
import { injectable } from "inversify";

@injectable()
export abstract class ControllerBase {
  async validateParameters<T extends object>(
    constructor: { new (): T },
    data: object
  ) {
    const dtoRequest = new constructor();
    Object.assign(dtoRequest, data);

    return await ValidateService.validate(dtoRequest);
  }
}
