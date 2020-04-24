/*
* Dao User
*/
const baseDAO = require('../dao.js');
const pass = require('../../configurations/pass')

const dao = Object.create(baseDAO);

dao.GetDaily = (company,token,userID) => new Promise((resolve,reject)=>{
  let data = {body: {}}
  let query = {
    url: `${pass.REST.url}/rest/dash/attendance/daily`, 
    method:"get",
    header:{
        token:token,
        id: userID,
    }
  }
  dao.rest_query(query,data)
    .then((results) => {
      resolve(results);
    })
    .catch((r) => {
      reject(r);
    });
})

module.exports = dao