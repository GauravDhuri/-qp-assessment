import express, { Application } from "express";
import middlewares from "../middlewares";

export class Middleware {
  public async init(app: Application): Promise<void> {
    try {
      app.use(express.json());

      for (const middleware of middlewares.list) {
        const middlewareFunction = await import(middleware);
        app.use(middlewareFunction.default);
      }
    } catch (error) {
      console.error("Error initializing middlewares:", error);
      throw error;
    }
  }
}
