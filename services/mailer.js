	const pass = require('../configurations/pass.js')
	const constants = require('../configurations/constants')
	const Mail = require('../model/mail.js')
	
	const nodemailer = require('nodemailer');

	var transporter = null
	
	if (pass.Mail.use){
		transporter = nodemailer.createTransport({
			host: pass.Mail.host,
			secure: false,
			port: pass.Mail.port,
			tls: {rejectUnauthorized: false},
			auth: {
				user: pass.Mail.user,
				pass: pass.Mail.pass
			},
			debug: constants.Debug,
			logger: constants.Debug
		});
	}

	// Mailer Service
	const Mailer = {}
	Mailer.SendMail = (id,mail)=> new Promise((resolve,reject)=>{
		if(transporter == null)
			return reject({})

		let mailOptions = {
			from: pass.Mail.mail,
			to: mail,
			subject: 'TeleCOVID - Protocolo',
			html: Mail.Template.replace('{id}',id)
		};
		
		transporter.sendMail(mailOptions)
		.then(r=>{
			console.log("Email sent to ",mail)
			resolve(r)
		})
		.catch(e=>{
			console.log("Error on send email",e)
			reject(e)
		})	
	});
	
	module.exports = Mailer
	