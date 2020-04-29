const baseController = require('./baseController');
var AdminController = {}
AdminController = Object.create(baseController);

// ==> PAGES

AdminController.Prontuary = (req,res) =>{
	res.render("admin/ptbr/config_prontuary.hbs")
}

module.exports = AdminController
