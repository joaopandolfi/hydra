const baseController = require('./baseController');
var PatientController = {}
PatientController = Object.create(baseController);

// ==> REST
PatientController.New = (req,res) =>{
	res.send({success:true})
}

PatientController.GetByHospital = (req,res) =>{
    res.send({success:true})
}

module.exports = PatientController
