"use strict";

/**
 * @Author Ken
 * @CreateDate 2017-09-05 10:44
 * @LastUpdateDate 2017-09-05 10:44
 * @desc 加载后台module模式, 根据conf文件自动绑定路由
 * @params
 * @return
 */

const _ = require('lodash');
const walk = require('walk');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const METHODS = ['GET', 'POST', 'DELETE', 'PUT'];

function _bind(middlewares, moduleName, router, conf, controller) {
  conf.route.forEach((route) => {
    if (!route) {
      throw `no 'route' found in route config, module = ${moduleName}`;
    }

    let [method, path, middleware_func] = route.replace(/\s+/, ' ').split(' ');
    if (!method || !path || !middleware_func || !METHODS.includes(method)) {
      throw `route config has wrong format, module = ${moduleName}`;
    }

    let middlewareNames = middleware_func.replace(/\s/g, '').split('|');
    let func = middlewareNames.pop();
    if (!controller[func]) {
      throw `no '${func}' found in controller, module = ${moduleName}`;
    }

    let args = [path];
    middlewareNames.forEach(middlewareName => {
      let middleware = _.get(middlewares, middlewareName);
      if (middleware) {
        logger.info(`[${moduleName}] has middleware (${middlewareName})`);
        args.push(middleware);
      }
      else
        logger.error(`[${moduleName}] has middleware (${middlewareName}), but not found`);
    });
    args.push(controller[func]);
    router[method.toLowerCase()].apply(router, args);
  });
}

function _loadModule(moduleName) {
  return fs.existsSync(moduleName) ? require(moduleName) : false;
}

module.exports = (middlewares, router) => {
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
          _bind(middlewares, dir.name, router, conf, controller);
          next();
        }
        catch (err) {
          logger.error(err, `file = ${dir.name}`);
        }
      }
    });
  });
};

