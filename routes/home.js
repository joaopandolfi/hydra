const router = require('express').Router();
const navigationController = require('../controller/navigationController')
const authController = require("../controller/authController")


router.get('/',authController.Auth, navigationController.Home)
router.get('/lang/:lang', navigationController.SetLanguage)

module.exports = router