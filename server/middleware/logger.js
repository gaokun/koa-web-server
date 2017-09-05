"use strict";

module.exports = async (ctx, next) => {
  // TODO: Ken add api logger here
  let start = Date.now();
  await next();
  let ms = Date.now() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
};
