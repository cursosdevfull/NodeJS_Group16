import { NextFunction, Request, Response } from "express";

import { TokensDto } from "../../auth/application/dtos/tokens.dto";

export class AuthenticationMiddleware {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "Unauthorized" });

    if (authorization.split(" ")[0] !== "Bearer")
      return res.status(401).json({ message: "Unauthorized" });

    if (!authorization.split(" ")[1])
      return res.status(401).json({ message: "Unauthorized" });

    TokensDto.verifyToken(authorization.split(" ")[1])
      .then((result: any) => {
        res.locals.roles = result.roles.map((role: any) => role.name);
        return next();
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          return res.status(403).json({ message: "token expired" });
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });
  }
}
