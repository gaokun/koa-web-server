"use strict";

class Book {
  async get(ctx) {
    let id = ctx.params.id;
    ctx.body = `you are searching book (id:${id})`;
  }

}

module.exports = new Book();