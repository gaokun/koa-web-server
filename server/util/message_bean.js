/**
 * Created by ken on 17/6/1.
 */

const C = require('./const');

function Error(errorCode, message, data) {
  this.code = 500;
  this.errorCode = errorCode;
  this.message = message || C.ERROR_CODE.DESC[errorCode];
  this.data = data;
}

function SuccessMessage(message, data) {
  this.code = 200;
  this.message = message;
  this.data = data;
}

function FailMessage(errorCode, message, data) {
  this.code = 500;
  this.errorCode = errorCode;
  this.message = message || C.ERROR_CODE.DESC[errorCode];
  this.data = data;
}

module.exports = {
  Error: Error,
  SuccessMessage: SuccessMessage,
  FailMessage: FailMessage
};
