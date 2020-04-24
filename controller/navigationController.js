const NavigationController = {}

 // ==> METADATA
 NavigationController.generateMetadata = () =>{
	return {
		site:{titulo:['Hydra'],descricao:['Hydra prontuary'],keywords:['hydra, protuary'],charset:['ISO-8859-1']},
		empresa:{name:['Hydra'],endereco:['São Paulo - SP']},
		layout:{icon:['./public/icon.png'],logo:['./public/logo.png']},
		user:{name:[''],empresa:[''],cargo:[''],avatar:['']},
		dados:{page:['Home']},
	}
}

NavigationController.GetLang = (req) =>{
	let lang = req.session.lang == undefined? "ptbr": req.session.lang;
	if( lang == "ptbr")
		return ""
	return `-${lang}`
}

// ==> PAGES

NavigationController.SetLanguage = (req,res) =>{
	let {lang} = req.params
	let langs = ["ptbr","esmx"]
	if(langs.indexOf(lang)>=0)
		req.session.lang = lang
	else
		req.session.lang = "ptbr"
	res.redirect("/")	
}


NavigationController.Home = (req,res) =>{
	res.render("home.hbs")
}

module.exports = NavigationController
