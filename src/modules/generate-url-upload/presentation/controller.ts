import { IError } from "@core/interfaces/ierror.interface";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { GenerateUrlUploadApplication } from "../application/generate-url-upload.application";

@injectable()
export class GenerateUrlPresignedController {
  constructor(
    @inject("GenerateUrlUploadApplication")
    private readonly generateUrlUpload: GenerateUrlUploadApplication
  ) {}

  async generateUrlPresigned(req: Request, res: Response, next: NextFunction) {
    const { extension } = req.query;
    const filename = `${Date.now()}.${extension}`;
    const result = await this.generateUrlUpload.generateUrlPresigned(filename);
    if (result.isErr()) {
      const objError: IError = new Error(result.error.message);
      objError.status = result.error.status;
      objError.stack = result.error.stack;

      return next(objError);
    }

    const url = result.value as string;
    res.json({ url, filename });
  }
}
