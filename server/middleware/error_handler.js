"use strict";

const C = require('../util/const');
const logger = require('../util/logger');
const {Error} = require('../util/message_bean');

module.exports = async (ctx, next) => {
  try {
    await next();
  }
  catch(e) {
    logger.error('Error Handler', e);

    if (!e) {
      ctx.body = new Error(C.ERROR_CODE.SYSTEM_ERROR);
    }
    else if (e.errorCode) {
      ctx.body = e;
    }
    else {
      ctx.body = new Error(C.ERROR_CODE.SYSTEM_ERROR, e.name, e.message);
    }
  }
};
