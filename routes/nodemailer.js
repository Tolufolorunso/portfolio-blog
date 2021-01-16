const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
	try {
		const { message, email, date, servicesRequired } = req.body;
		var transporter = nodemailer.createTransport({
			service: 'gmail', //smtp.gmail.com  //in place of service use host...
			secure: false, //true
			port: 25, //465
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		var mailOptions = {
			from: email,
			to: 'tolufolorunso@yahoo.com',
			subject: 'Email from my portfolio page',
			text: `
			Email from: ${email},
			Services Needed: ${servicesRequired}
			Date: ${date},
			message: ${message}
			`,
			html: ``
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('something went wrong, try again', error);
				res.status(400).json({
					title: 'something went wrong, try again',
					time: req.time,
					isAuthenticated: false
				});
			} else {
				console.log('Email sent: ' + info.response);
				res.status(200).json({
					title: 'message sent successfully',
					time: req.time,
					isAuthenticated: false
				});
			}
		});
	} catch (error) {
		res.status(400).render('index', {
			title: 'something went wrong, try again',
			time: req.time,
			isAuthenticated: false
		});
	}
});

module.exports = router;
