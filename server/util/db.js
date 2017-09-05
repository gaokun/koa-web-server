"use strict";

const _ = require('lodash');
const mysql = require('mysql');
const logger = require('./logger');
const Promise = require('bluebird');
const C = require('./const.js');
const config = require('./config.js');
const {Success, Error} = require('../util/message_bean');

let pool = mysql.createPool(config.db);
exports.getConnection = (callback) => {
  return pool.getConnection(callback);
};

/**
 * @Author Ken
 * @CreateDate 2017-08-24 11:31
 * @LastUpdateDate 2017-08-24 11:31
 * @desc 执行多条sql
 * @params
 * @return
 */
exports.querySQLs = (sql) => {
  let _config = _.clone(config.db);
  _config.multipleStatements = true;
  let connection = mysql.createConnection(_config);

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      connection.end();
      if (err) {
        reject(err);
      }
      else {
        resolve(results);
      }
    });
  });
};

exports.end = () => {
  return pool.end();
};

/**
 * @Author Ken
 * @description 查询sql结果
 * @LastUpdateDate 2014-06-10
 * @parameter sql
 * @parameter params sql中?对应的数据,数组类型
 * @return promise
 * */
let _run = (sql, params) => {
  let formatSQL = params ? mysql.format(sql, params) : sql;
  logger.debug('db.query, sql = %s', formatSQL);

  return new Promise((resolve, reject) => {
    pool.query(formatSQL, function (error, rows) {
      if (error) {
        logger.error('Sql error, code=' + error.code + ',sqlState=' + error.sqlState + ',msg=' + error.message, 'sql =', formatSQL);
        reject(new Error(C.ERROR_CODE.DB_ERROR, null, {code: error.code, sqlState: error.sqlState}));
      }
      else
        resolve(rows);
    });
  });
};
exports.run = _run;

/**
 * @Author Ken
 * @description CRUD 操作 只提供对单表的CRUD基本操作,如需高级功能还需要调用query方法
 * @LastUpdateDate 2014-08-10
 * @LastUpdateDate 2015-07-11 support column specify
 * @parameter tableName
 * @parameter whereParam
 * @parameter params     //根据此参数的属性组合sql
 * Example:
 *  {
 *      group : 'id,name',
 *      order : 'id,name desc',
 *      limit : [0,100],
 *      page  : [0,20] //第0页, 每页20个  Note:limit 与 page 同时存在时, limit优先
 *  }
 *  Demo:
 *   db.select('client',{id:1},{group:'id,name',order:'id,name desc',limit:[0,2]});
 *  Sql :
 *   select * from `client` where `id` = 1 group by id,name order by id,name desc limit 0,2
 *
 *
 * Example:
 *  {
 *      group : 'id,name',
 *      order : 'id,name desc',
 *      limit : [0,100],
 *      page  : [0,20] //第0页, 每页20个  Note:limit 与 page 同时存在时, limit优先,
 *      column: 'id,name'
 *  }
 *  Demo:
 *   db.select('client',{id:1},{group:'id,name',order:'id,name desc',limit:[0,2],column:'id,name'});
 *  Sql :
 *   select id,name from `client` where `id` = 1 group by id,name order by id,name desc limit 0,2
 * @return promise
 * */
exports.select = (tableName, whereParam, params) => {
  let queryColumn = (params && params.column) ? params.column : '*';

  let sql = "select " + queryColumn + " from `" + tableName + "`";

  if (typeof whereParam == 'object') {
    let sqlWhere = pool.escape(whereParam).replace(/,/g, ' and');
    if (sqlWhere && sqlWhere.length > 0)
      sql = sql + " where " + sqlWhere;
  }
  else if (typeof whereParam == 'string') {
    sql = sql + " where " + whereParam;
  }
  if (params) {
    if (params.select) sql = sql.replace('*', params.select);
    if (params.group) sql = sql + " group by " + params.group;
    if (params.order) sql = sql + " order by " + params.order;
    if (params.limit) sql = sql + " limit " + params.limit[0] + ',' + params.limit[1];
    else if (params.page) sql = sql + " limit " + (params.page[0] - 1) * params.page[1] + ',' + params.page[1];
  }
  return _run(sql);
};

exports.update = (tableName, objSet, objWhere) => {
  let sql = "update `" + tableName + "` set ?";
  let sqlWhere = pool.escape(objWhere).replace(/,/g, ' and');
  if (sqlWhere && sqlWhere.length > 0)
    sql = sql + " where " + sqlWhere;
  return _run(sql, objSet);
};

exports.delete = (tableName, objWhere) => {
  let sql = "delete from `" + tableName + "`";
  let sqlWhere = pool.escape(objWhere).replace(/,/g, ' and');
  if (sqlWhere && sqlWhere.length > 0)
    sql = sql + " where " + sqlWhere;
  return _run(sql);
};

/**
 * @description
 *      rows.insertId will be the inserted id under 'auto_increment' config
 * */
exports.insert = async (tableName, objSet) => {
  let sql = "insert into " + tableName + " set ?";
  let result = await _run(sql, objSet);
  return {id: result.insertId};
};

