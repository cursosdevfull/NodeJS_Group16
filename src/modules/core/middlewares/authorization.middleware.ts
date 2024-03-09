import { NextFunction, Request, Response } from "express";

export class AuthorizationMiddleware {
  static execute(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { roles } = res.locals;
      const hasPermission = roles.some((role: string) =>
        rolesAllowed.includes(role)
      );
      if (!hasPermission) {
        return res.status(403).json({ message: "Forbidden" });
      }
      return next();
    };
  }
}
