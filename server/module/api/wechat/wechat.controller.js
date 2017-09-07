"use strict";

// const Wechat1 = require('wechat');
// const CoWechat = require('co-wechat');
// const WechatAPI = require('co-wechat-api');
const jwt = require('../../../util/jwt');
const config = require('../../../util/config');
const {Success, Error} = require('../../../util/message_bean');
const db = require('../../../util/db');

class Wechat {
  async checkServer(ctx) {
    ctx.body = '';

    // Wechat(config.wechat)
    //   .text(wechatText)
    //   .event(wechatEvent)
    //   .image(wechatImage)
    //   .middlewarify()
  }

  async text(ctx) {
    ctx.body = {newUser: 32};
  }

  async createToken(ctx) {
    let token = jwt.create({uid: 1});
    ctx.body = new Success(null, {token: token});
  }
}

module.exports = new Wechat();