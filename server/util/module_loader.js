"use strict";

/**
 * @Author Ken
 * @CreateDate 2017-09-05 10:44
 * @LastUpdateDate 2017-09-05 10:44
 * @desc 加载后台module模式, 根据conf文件自动绑定路由
 * @params
 * @return
 */

const walk = require('walk');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const METHODS = ['GET', 'POST', 'DELETE', 'PUT'];

function _bind(router, conf, controller) {
  conf.route.forEach((route) => {
    if (!route) {
      throw "no 'route' found in route config";
    }
    let [method, path, func] = route.split(' ');
    if (!method || !path || !func || !METHODS.includes(method)) {
      throw "route config has wrong format";
    }
    router[method.toLowerCase()](path, controller[func]);
  });
}

function _loadModule(moduleName) {
  return fs.existsSync(moduleName) ? require(moduleName) : false;
}

module.exports = (router) => {
  let walker = walk.walk(path.join(__dirname, '../module/api/'));

  walker.on('errors', (root, nodeStatsArray, next) => {
    logger.error('module folder error', nodeStatsArray);
  });

  walker.on('directories', (root, dirStatsArray, next) => {
    dirStatsArray.forEach(dir => {
      let url = root + dir.name + '/' + dir.name;
      logger.info('load module: ' + dir.name);
      let conf = _loadModule(url + '.conf.json');
      let controller = _loadModule(url + '.controller.js');
      if (conf && controller) {
        try {
          _bind(router, conf, controller);
          next();
        }
        catch (err) {
          logger.error(err, `file = ${dir.name}`);
        }
      }
    });
  });
};

