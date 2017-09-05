"use strict";

const jwt = require('../../../util/jwt');
const {Success, Error} = require('../../../util/message_bean');

class User {
  async get(ctx) {
    let id = ctx.params.id;
    ctx.body = `you are searching user (id:${id})`;
  }

  async add(ctx) {
    let body = ctx.request.body;
    ctx.body = {lalaa: 32};
  }

  async createToken(ctx) {
    let token = jwt.create({uid: 1});
    ctx.body = new Success(null, {token: token});
  }
}

module.exports = new User();