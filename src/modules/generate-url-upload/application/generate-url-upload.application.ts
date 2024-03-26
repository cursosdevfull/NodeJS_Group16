import { inject, injectable } from "inversify";

import { GenerateUrlUploadRepository } from "../domain/repositories/generate-url-upload.repository";
import { GenerateUrlResult } from "../infrastructure/generate-url-upload.infrastructure";

@injectable()
export class GenerateUrlUploadApplication {
  constructor(
    @inject("GenerateUrlUploadRepository")
    private readonly generateUrlUploadRepository: GenerateUrlUploadRepository
  ) {}

  async generateUrlPresigned(filename: string): Promise<GenerateUrlResult> {
    return await this.generateUrlUploadRepository.generateUrlPresigned(
      filename
    );
  }
}
