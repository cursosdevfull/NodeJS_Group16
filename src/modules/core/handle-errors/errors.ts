import { IError } from "@core/interfaces/ierror.interface";
import { NextFunction, Request, Response } from "express";

export const HandlerErrorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Path not found");
};

export const HandlerErrorGeneral = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let objError: { [k: string]: string | number } = {
    name: error.name,
    message: error.message,
    status: error.status,
  };

  if (process.env.NODE_ENV !== "production") {
    objError = {
      ...objError,
      stack: error.stack,
    };
  }

  res.status(error.status).json(objError);
};
