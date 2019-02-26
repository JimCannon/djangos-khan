const express = require('express');
const Joi = require('joi');
const User = require('models/User');

const router = express.Router();

const schema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string().regex(/[a-zA-Z0-9!"#€%&"]{6,30}/)
});

router.get('/register', function(req, res){
	res.render('register', {
		page: {
			register: true
		},
	});
});

router.post('/register', function(req, res) {
	const result = Joi.validate(req.body, schema);
	
	if (result.error !== null) {
		// return res.status(400).send(result.error.message);
		return res.render('register', {
			page: {
				register: true
			},
			email: req.body.email,
			error: result.error
		});
	}

	User.create(req.body).then(function() {
		res.render('register-success');
	}).catch(function(error) {
		res.render('register', {
			page: {
				register: true
			},
			email: req.body.email,
			error
		}); 
	});

	
});

module.exports = router;