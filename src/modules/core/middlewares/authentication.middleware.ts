import { IError } from "@core/interfaces/ierror.interface";
import { NextFunction, Request, Response } from "express";

import { TokensDto } from "../../auth/application/dtos/tokens.dto";

export class AuthenticationMiddleware {
  static execute(validate2FA: boolean = true) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;

      if (
        !authorization ||
        authorization.split(" ")[0] !== "Bearer" ||
        !authorization.split(" ")[1]
      ) {
        const objError: IError = new Error("Unauthorized");
        objError.status = 401;
        objError.stack = "Unauthorized";
        return next(objError);
      }

      TokensDto.verifyToken(authorization.split(" ")[1])
        .then((result: any) => {
          res.locals.roles = result.roles.map((role: any) => role.name);
          res.locals.userId = result.id;
          /*  if (validate2FA && !result.is2FAEnabled)
            return res.status(401).json({ message: "Unauthorized" }); */
          return next();
        })
        .catch((error) => {
          if (error.message === "jwt expired") {
            const objError: IError = new Error("Forbidden");
            objError.status = 403;
            objError.stack = "Token expired";
            return next(objError);
          } else {
            const objError: IError = new Error("Unauthorized");
            objError.status = 401;
            objError.stack = "Unauthorized";
            return next(objError);
          }
        });
    };
  }
}
