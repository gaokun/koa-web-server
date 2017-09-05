"use strict";

const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const router = require('koa-router')({prefix: '/api'});

const MiddlewareLoader = require('./util/middleware_loader');
const ModuleLoader = require('./util/module_loader');

const app = new Koa();
app.use(serve(__dirname + '/../public'));
app.use(cors());
app.use(bodyParser());

MiddlewareLoader().then(middlewares => {
  app.context.middlewares = middlewares;

  router.use(middlewares.error_handler);
  router.use(middlewares.x_response_time);
  router.use(middlewares.decode_token);
  router.use(middlewares.logger);

  ModuleLoader(middlewares, router);
});

app.use(router.routes());
app.use(router.allowedMethods());

let port = process.env.PORT || 5000;
app.listen(port);
console.log(`server is running on port:${port} ...`);