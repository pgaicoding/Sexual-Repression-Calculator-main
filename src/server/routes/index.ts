import {Hono} from "hono";

export function setupRoutes(app: Hono) {
  const routes = new Hono();

  // 基本的env端点
  routes.get("/env", (c) => {
    return c.json({
      NODE_ENV: process.env.NODE_ENV || "development",
      PORT: process.env.PORT || 3001,
      status: "ok"
    });
  });

  // 健康检查端点
  routes.get("/health", (c) => {
    return c.json({
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  });

  const entry = app.route("/api", routes);

  return entry;
}

export type AppType = ReturnType<typeof setupRoutes>;
