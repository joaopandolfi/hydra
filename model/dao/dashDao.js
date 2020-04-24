/*
* Dao Dash
*/
const baseDAO = require('../dao.js');
const pass = require('../../configurations/pass')

const dao = Object.create(baseDAO);

dao.GetById = id => new Promise((resolve,reject)=>{
    let query = {
        url: `${pass.Lambda.url}/Prod/dash`, 
        method:"get",
        header:{
            "x-api-key":pass.Lambda.apiKey,
            "token":pass.Lambda.secretToken,
            "qr":id
        }
    }
    // Making request
    dao.rest_query(query,{})
    .then((results) => {
        resolve(results);
    })
    .catch((r) => {
        reject(r);
    });
})


module.exports = dao;