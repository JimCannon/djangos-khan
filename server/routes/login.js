import express from 'express';
import User from 'models/User';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.get('/', function(req, res){
	res.render('login', {
		page: {
			login: true,
			title: 'Log in',
		},
	});
});

router.post('/', async function(req, res) {
	// Convert rememberMe checkbox as boolean
	const rememberMe = !!req.body.rememberMe;

	try {
		const user = await User.login(req.body);
		
		if (rememberMe) {
			res.cookie('userId', user._id, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
		} else {
			req.session.userId = user._id;
		}
	} catch(err) {
		return res.status(400).render('login', {
			err,
			email: req.body.email
		});
	}

	res.redirect('/account');
});

module.exports = router;