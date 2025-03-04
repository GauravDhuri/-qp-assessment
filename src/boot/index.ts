import { Database } from "./database";
import { Middleware } from "./middleware";
import { Route } from "./route";

(async (): Promise<any> => {
  try {
    const db = Database.getInstance();
    const route = new Route();
    const middleware = new Middleware();
    const app = await require('./server');

    await db.initSupabase();
    console.log('supabase connection established');

    await middleware.init(app);
    console.log('Middleware linking complete');

    await route.init(app);
    console.log('Routes registration complete');

    console.log(`Grocery Management Server Listening at ${process.env.PORT}`)
  } catch (error) {
    console.log('Applicaiton boot up failed', error)
    process.exit(1);
  }
})();