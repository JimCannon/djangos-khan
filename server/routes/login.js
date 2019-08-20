const express = require('express');
const User = require('models/User');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.get('/login', function(req, res){
	res.render('login', {
		page: {
			login: true
		},
	});
});

router.post('/login', async function(req, res) {
	//convert rememberMe checkbox as boolean
	const rememberMe = !!req.body.rememberMe;

	try {
		const user = await User.login(req.body);
		
		if(rememberMe) {
			res.cookie('userId', user._id, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
		} else {
			req.session.userId = user._id;
		}
	} catch(e) {
		console.log(e)
		res.status(400).render('login', {
			e,
			email: req.body.email
		});
	}

	res.redirect('/index');
});

module.exports = router;