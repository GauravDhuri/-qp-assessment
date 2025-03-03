import { Application } from "express";
import { bindRoutes } from "./../routes";

export class Route {
  public async init(app: Application): Promise<void> {
    await bindRoutes(app);
  }
}
