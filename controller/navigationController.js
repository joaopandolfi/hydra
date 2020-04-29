const baseController = require('./baseController');
const constants = require("../configurations/constants")
var NavigationController = {}
NavigationController = Object.create(baseController);


// ==> PAGES

NavigationController.SetLanguage = (req,res) =>{
	let {lang} = req.params
	let {Supporteds, Default} = constants.Lang
	if(Supporteds.indexOf(lang)>=0)
		req.session.lang = lang
	else
		req.session.lang = Default
	res.redirect("/")	
}


NavigationController.Home = (req,res) =>{
	res.render("home.hbs")
}

module.exports = NavigationController
