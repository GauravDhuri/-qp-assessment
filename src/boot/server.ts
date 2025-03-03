import express, { Application } from "express";

const app: Application = express();
const port: number | undefined = Number(process.env.PORT);

try {
  if(isNaN(port)) {
    throw new Error("PORT environment variable is not set or is invalid.");
  }
  app.listen(port);
} catch (error: any) {
  console.log(error);
}

export = app;