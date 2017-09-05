"use strict";

/**
 * @Author Ken
 * @CreateDate 2017-09-05 11:12
 * @LastUpdateDate 2017-09-05 11:12
 * @desc 统一解析token, 放到上下文中, 以便controller调用
 * @params
 * @return
 */

const jwt = require('../util/jwt');

module.exports = async (ctx, next) => {
  let token = ctx.headers['app-token'];
  ctx.state.user = jwt.decodeToken(token);
  await next();
};
