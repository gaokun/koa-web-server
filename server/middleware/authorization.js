"use strict";

const C = require('../util/const');
const {Error} = require('../util/message_bean');

exports.check = async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.body = new Error(C.ERROR_CODE.TOKEN_ERROR);
  }
  else {
    await next();
  }
};
