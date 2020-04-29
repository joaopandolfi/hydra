const router = require('express').Router();
const adminController = require('../controller/adminController')
const authController = require("../controller/authController")

router.get('/prontuary',authController.Auth, adminController.Prontuary)

module.exports = router