import { Application, Request, Response } from "express";
import { promises as fsp } from 'fs';
import path from "path";

export async function bindRoutes(app: Application): Promise<void> {
  await linkRoutes(app, 'v1');
  
  app.get('/healthCheck', (_req: Request, res: Response) => {
    res.status(200).send('Service Running');
  });
}

async function linkRoutes(app: Application, version: string): Promise<void> {
  const routeFiles = await fsp.readdir(path.join(__dirname, version));

  await Promise.all(
    routeFiles.map(async (file) => {
      const routeName = path.parse(file).name;
      const routePath = path.join(__dirname, version, file);
      const routeModule = await import(routePath);
      app.use(`/api/${version}/${routeName}`, routeModule.default);
    })
  );
}
