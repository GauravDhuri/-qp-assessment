import { NextFunction, Request, Response } from "express";

module.exports = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log('error handler', err.stack);
  return res.status(200).json({
    status: false,
    msg: 'INVALID_REQUEST',
    data: {}
  })
}