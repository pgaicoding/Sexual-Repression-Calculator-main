import {Hono} from "hono";
import {serveStatic} from "hono/bun"; // 使用通用的静态文件服务
import {serve} from "@hono/node-server";
import {setupRoutes} from "./routes";

const app = new Hono();

const presevePaths = ["/static", "/favicon.svg", "/api"];

app.use(
  "*",
  serveStatic({
    root: `web`,
    rewriteRequestPath(path) {
      if (presevePaths.some((p) => path.startsWith(p))) {
        return path;
      }
      return "/";
    },
  }),
);

setupRoutes(app);

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 Server running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});