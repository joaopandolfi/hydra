/*
* Modelo base do Dao
*/
const Mysql = require('../database/mysql');
const axios = require('axios');

// Class
const dao = {};

dao.sql_query = (query, data) => new Promise((resolve, reject) => {
 
  let sql = '';
  try {
    sql = Mysql.format(query, data);
  } catch (e) {
    const result = dao.format_error(500, 'Database error');
    console.log({err:e});
    return reject(result);
  }

  return Mysql.query(sql)
    .then(results => resolve(dao.format_response(results)))
    .catch((err) => reject(dao.format_error(500, 'Internal server error',err)));
});

/**
 * Make requests to our rest server
 * @param query {method:"",url:"",header:object}
 * @param data {body:object,params:object}
 * @returns {sucess:bool,data:object}
 */
dao.rest_query = (query,data) => new Promise((resolve,reject) =>{
  axios({
    method:query.method,
    url:query.url,
    headers:query.header,
    data:data.body,
    params:data.params
  })
  .then(result => resolve(dao.format_rest_response(result)))
  .catch(err => {
    console.log("[DAO][rest_query] - AXIOS ERROR",err)
    reject(dao.format_error(500,'Internal server error',''))
  })
});

dao.format_rest_response = pData =>({
  success: true,
  data: pData.data,
})

dao.format_response = pData => ({
  success: true,
  data: pData,
});

dao.format_error = ((errorCode, pMessage,err) => ({
  success: false,
  error: errorCode,
  message: pMessage,
  err:err
}));

module.exports = dao;