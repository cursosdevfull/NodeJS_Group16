import { NextFunction, Request, Response } from 'express';

export const interceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodJSONOriginal = res.json;
  res.json = function (data) {
    if (res.statusCode === 200 || res.statusCode === 201) {
      return methodJSONOriginal.call(this, {
        status: "success",
        statusCode: res.statusCode,
        response: data,
      });
    } else if (res.statusCode >= 400 && res.statusCode <= 600) {
      return methodJSONOriginal.call(this, {
        status: "error",
        statusCode: res.statusCode,
        response: data,
      });
    }

    return methodJSONOriginal;
  };

  next();
};
