import { ValidateService } from "@core/services/validate.service";

export abstract class ControllerBase {
  async validateParameters<T extends object>(
    constructor: { new (): T },
    data: object
  ) {
    const dtoRequest = new constructor();
    Object.assign(dtoRequest, data);
    console.log("dtoRequest", dtoRequest);

    return await ValidateService.validate(dtoRequest);
  }
}
