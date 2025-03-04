import { NextFunction, Request, Response } from "express";

module.exports = (req: Request, _res: Response, next: NextFunction) => {
  const rp = req.path;
  console.log('Request Path', rp);

  return next();
}