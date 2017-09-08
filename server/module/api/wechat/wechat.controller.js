"use strict";

const CoWechat = require('co-wechat');
const WechatAPI = require('co-wechat-api');
const jwt = require('../../../util/jwt');
const config = require('../../../util/config');
const {Success, Error} = require('../../../util/message_bean');
const db = require('../../../util/db');

class Wechat {
  constructor () {
    this.handler = CoWechat(config.wechat).middleware(async (message, ctx) => {
      console.dir(message);
      return message.Content + '=--=';
    });
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