"use strict";

class User {
  async get(ctx) {
    let id = ctx.params.id;
    ctx.body = `you are searching user (id:${id})`;
  }

  async add(ctx) {
    let body = ctx.request.body;
    ctx.body = `you are adding an user, ${JSON.stringify(body)}`;
  }
}

module.exports = new User();