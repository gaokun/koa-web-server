"use strict";

const logger = require('../util/logger');

module.exports = async (ctx, next) => {
  // TODO: Ken add api logger here
  let start = Date.now();
  await next();
  let ms = Date.now() - start;
  logger.debug('%s %s - %s', ctx.method, ctx.url, ms);
};
