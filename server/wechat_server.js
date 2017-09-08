"use strict";


const Koa = require('koa');
const co_wechat = require('co-wechat');
const router = require('koa-router')();
const config = require('./util/config');

const app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());


router.use(async (ctx, next) => {
  console.log('path', ctx.path);
  next();
});

router.all('/wechat', co_wechat(config.wechat).middleware(async (message, ctx) => {
  // 微信输入信息就是这个 message
  if (message.FromUserName === 'Ken') {
    // 回复屌丝(普通回复)
    return 'hehe';
  }
  ctx.body = 'wechat api';
}));

let port = process.env.PORT || 5000;
app.listen(port);
console.log(`server is running on port:${port} ...`);
