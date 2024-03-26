import { GenerateUrlResult } from "../../infrastructure/generate-url-upload.infrastructure";

export interface GenerateUrlUploadRepository {
  generateUrlPresigned(filename: string): Promise<GenerateUrlResult>;
}
