const qrcode = require('qrcode')
const fs = require('fs')

const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')

const FileController = {}

async function getQRCode(data){
    return await qrcode.toDataURL(data);
}

FileController.GetCertFile =  (req, res) => {
    res.setHeader('Content-Type','application/pdf')
    
    let file = req.params.id
    file = file.toString().split(".")
    fs.createReadStream( constants.Paths.Upload+"/"+file[0]).pipe(res)
    //res.download(constants.Paths.Upload+"/"+file[0],req.params.id)
}

FileController.GetCertFile2 =  (req, res) => {
    res.setHeader('Content-Type','application/pdf')
    
    let file = req.params.id
    file = file.toString().split(".")
    //fs.createReadStream( constants.Paths.Upload+"/"+file[0]).pipe(res)
    res.download(constants.Paths.Upload+"/"+file[0],req.params.id)
}


FileController.GetQrCode = (req,res) =>{
    if(!PermissionLevelController.CheckLevel(req,res,constants.Users.USER)) return
    let companyID = req.session.company
    let id = req.params.id
    let fileID = req.params.fileID

    let payload = {
        company: companyID,
        inspectionID: id,
        fileID: fileID
    }

    payload = JSON.stringify(payload)
    
    getQRCode(btoa(payload))
    .then(qrcode =>{
        res.render("qrcode.hbs",{qrcode:qrcode})
    })
    .catch(r=>{console.log(r); res.send("Internal server error")})
}

module.exports = FileController