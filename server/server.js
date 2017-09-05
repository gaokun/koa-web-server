"use strict";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const router = require('koa-router')({prefix: '/api'});

const MiddlewareLoader = require('./util/middleware_loader');
const ModuleLoader = require('./util/module_loader');

const app = new Koa();
app.use(cors());
app.use(bodyParser());

app.keys = ['im a newer secret', 'i like turtle'];

MiddlewareLoader().then(middlewares => {
  app.context.middlewares = middlewares;

  router.use(middlewares.x_response_time);
  router.use(middlewares.logger);
  router.use(middlewares.decode_token);

  ModuleLoader(middlewares, router);
});

app.use(router.routes());
app.use(router.allowedMethods()); // OPTIONS?

app.listen(process.env.PORT || 1234);
console.log('running...');