"use strict";

/**
 * @Author Ken
 * @CreateDate 2017-09-05 10:50
 * @LastUpdateDate 2017-09-05 10:50
 * @desc json web token util
 * @params
 * @return
 */

const JWT = require('jsonwebtoken');

const JWT_SECRET = "!@^$4&*(7856Ghjhfg%hgfgj*&6^$";
const JWT_APP_TOKEN_EXPIRE_TIME = 30*24*3600; //1 month
exports.JWT_APP_TOKEN_EXPIRE_TIME = JWT_APP_TOKEN_EXPIRE_TIME;


exports.create = (_payload) => {
  let now = Math.floor(Date.now() / 1000);
  let payload = {
    iat: now,
    exp: now + JWT_APP_TOKEN_EXPIRE_TIME,
  };
  _.assign(payload, _payload);

  return JWT.sign(payload, JWT_SECRET);
};

exports.decodeToken = (token) => {
  let ret = null;
  try {
    ret = JWT.verify(token, JWT_SECRET);
  }
  catch(e) {}
  return ret;
};

