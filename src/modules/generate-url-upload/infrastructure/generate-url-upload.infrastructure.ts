import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IError } from "@core/interfaces/ierror.interface";
import { Parameters } from "@core/parameters";
import { injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

import { GenerateUrlUploadRepository } from "../domain/repositories/generate-url-upload.repository";

const bucketName = Parameters.bucketName;
const s3 = new S3({ region: "us-east-1" });

export type GenerateUrlResult = Result<string, IError>;

@injectable()
export class GenerateUrlUploadInfrastructure
  implements GenerateUrlUploadRepository
{
  async generateUrlPresigned(filename: string): Promise<any> {
    try {
      const bucketName = Parameters.bucketName;
      console.log("params", {
        Bucket: bucketName,
        Key: filename,
      });
      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
        }),
        { expiresIn: Parameters.timeoutUrlPresigned }
      );

      return ok(url);
    } catch (error) {
      const objError: IError = new Error(error.message);
      objError.status = 500;
      return err(objError);
    }
  }
}
