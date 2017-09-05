"use strict";

/**
 * @Author Ken
 * @CreateDate 2017-09-05 10:45
 * @LastUpdateDate 2017-09-05 10:45
 * @desc 加载中间件, 统一管理, 方便调用
 * @params
 * @return
 */

const walk = require('walk');
const path = require('path');
const fs = require('fs');
const Promise = require("bluebird");
const logger = require('./logger');

function _loadModule(moduleName) {
  return fs.existsSync(moduleName) ? require(moduleName) : false;
}

module.exports = (router) => {
  return new Promise((resolve, reject) => {
    let walker = walk.walk(path.join(__dirname, '../middleware/'));
    let middlewares = {};

    walker.on('files', (root, dirStatsArray, next) => {
      dirStatsArray.forEach(dir => {
        let url = root + dir.name;
        let filename = dir.name.substring(0, dir.name.length - '.js'.length);
        // logger.info('load middleware: ' + dir.name, url, filename);
        middlewares[filename] = _loadModule(url);
        next();
      });
    });

    walker.on('errors', (root, nodeStatsArray, next) => {
      logger.error('middleware folder error', nodeStatsArray);
      reject('middleware folder error');
    });

    walker.on('end', () => {
      resolve(middlewares);
    });
  });
};

