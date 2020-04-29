const authConstants = require('../configurations/pass')
const constants = require('../configurations/constants')
const PermissionLevelController = require('./permissionLevelController')
const daoUser = require('../model/dao/userDao')
const authController = {}

authController.CheckAuth = (req,res,next) =>{
    let session = req.session; // Sessao igual do PHP
    console.log(session.username)
    res.locals.username = session.username || false
    next()
}

authController.FowardToken = (req,res,next) =>{
    req.headers.id = req.query.id;
    req.headers.token = req.query.token;
    next()
}


authController.CheckValidToken = (req,res,next) =>{
    // Check if have session
    if (req.session.username)
        return next()

    let id = req.headers.id;
    let token = req.headers.token;
    daoUser.CheckToken(id,token)
        .then((dbResult)=>{
            if(dbResult.data.length > 0){
                result = dbResult.data[0]
                req.session.permission = result.permission
                req.session.company = result.company
                req.session.userID = result.idUser
                req.session.token = result.token
                next();
            }else{
                res.send({success:false,logged:false})
            }
        })
        .catch(e=>{
            res.send({success:false})
        })
}

authController.GetLang = (req) =>{
	let lang = req.session.lang == undefined? "ptbr": req.session.lang;
	if( lang == "ptbr")
		return ""
	return `-${lang}`
}

authController.RedirectLogin = (req,res) =>{
    res.render(`login${authController.GetLang(req)}.hbs`)
}

authController.Forbidden = (req,res) =>{
    res.render('forbidden.hbs')
}

authController.Logout = (req,res) =>{
    req.session.username = null
    req.session.token = null
    res.redirect('/')
}

authController.Login = (req,res) =>{
    // Ir ao banco e efetuar login
    daoUser.Login(req.body)
        .then((result)=>{
            console.log(result)
            if(result.success){
                // LOGOU
                req.session.token = result.token
                req.session.id = result.id
                req.session.name = result.name
                req.session.company = result.company
                req.session.permission = result.permission
                return res.send({success:true})
            
            }
            res.send({success:false})
        })
        .catch(r=>{
            console.log(r)
            res.send({success:false})
        })
}

authController.Admin = async (req,res,next) =>{
    if(!PermissionLevelController.CheckLevel(req,res,constants.Users.ADMIN)) res.redirect('/forbidden')
    else next()
}

authController.Auth = async (req, res, next) => {
    let session = req.session
    if (!session.token) res.redirect('/login')
    else next()
}

module.exports = authController 