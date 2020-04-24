/*
* Dao User
*/
const dao = require('../dao.js');

const daoUser = Object.create(dao);
const pass = require('../../configurations/pass')

/**
* Efetua login do usuário
* @param user {username, password,company}
*/
daoUser.Login = user => new Promise((resolve, reject) => {
  let data = {body: user}
  let query = {url: `${pass.REST.url}/login`, method:"post",header:{hide_token:pass.REST.hideToken}}
  daoUser.rest_query(query,data)
    .then((results) => {
      resolve(results.data);
    })
    .catch((r) => {
      reject(r);
    });
});


module.exports = daoUser;
