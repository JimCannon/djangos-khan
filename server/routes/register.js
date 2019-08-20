import express from 'express';
import Joi from 'joi';
import User from 'models/User';
import cookieParser from 'cookie-parser';

const router = express.Router();

const schema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string().regex(/[a-zA-Z0-9!"#€%&"]{6,30}/)
});

router.get('/', function(req, res){
	res.render('register', {
		page: {
			register: true
		},
	});
});

// Register a new user
router.post('/', async function(req, res) {
	const result = Joi.validate(req.body, schema);
	// Check if there was an error
	if (result.error !== null) {
		// If there was an error, return user to same page with warning
		return res.render('register', {
			page: {
				register: true
			},
			// Return with same email
			email: req.body.email,
			error: result.error
		});
	}

	// Create user, throw error if constraint doesnt match 
	try {
		const user = await User.create(req.body);
		req.session.userId = user._id;
		res.render('register-success');
	} catch (error) {
		res.render('register', {
			page: {
				register: true
			},
			email: req.body.email,
			error
		}); 
	}
});

module.exports = router;