import {Hono} from "hono";
import {serveStatic} from "@hono/node-server/serve-static";
import {serve} from "@hono/node-server";
import {setupRoutes} from "./routes";

const app = new Hono();

// 静态文件服务
app.use("/static/*", serveStatic({
  root: "./dist/web"
}));

// API路由
setupRoutes(app);

// 基本路由 - 返回主页面
app.get("/", serveStatic({
  path: "./dist/web/index.html"
}));

// 所有其他路由返回主页面（SPA路由）
app.get("*", serveStatic({
  path: "./dist/web/index.html"
}));

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 Server running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});