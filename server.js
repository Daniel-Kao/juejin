const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");

const dev = process.env.NODE_ENV === "production";
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(async (ctx, next) => {
    await handleNextRequests(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => console.log("server running on port 3000"));
});
