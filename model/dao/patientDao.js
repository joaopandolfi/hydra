/*
* Dao User
*/
const baseDAO = require('../dao.js');
const pass = require('../../configurations/pass')

const dao = Object.create(baseDAO);

dao.GetById = id => new Promise((resolve,reject)=>{
    let query = {
        url: `${pass.Lambda.url}/Prod/patient/${id}`, 
        method:"get",
        header:{
            "x-api-key":pass.Lambda.apiKey,
            "token":pass.Lambda.secretToken
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

dao.SaveProntuary = (id,prontuary) => new Promise((resolve,reject) =>{
    let data = {body: prontuary}
    let query = {
        url: `${pass.Lambda.url}/Prod/patient/pront/${id}`, 
        method:"post",
        header:{
            "x-api-key":pass.Lambda.apiKey,
            "token":pass.Lambda.secretToken
        }
    }
    // Making request
    dao.rest_query(query,data)
    .then((results) => {
        resolve(results);
    })
    .catch((r) => {
        reject(r);
    });
})

module.exports = dao;