import {Hono} from "hono";
import {serve} from "@hono/node-server";
import {setupRoutes} from "./routes";

const app = new Hono();

// 设置路由
setupRoutes(app);

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 Server running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});