var BaseController = {}

BaseController.GetLang = (req) =>{
	let lang = req.session.lang == undefined? "ptbr": req.session.lang;
	if( lang == "ptbr")
		return ""
	return `-${lang}`
}

module.exports = BaseController