const router = require('express').Router();
const authController = require("../controller/authController")
const patientController = require("../controller/patientController")

router.post("/patient/new",authController.Auth, patientController.New)

module.exports = router