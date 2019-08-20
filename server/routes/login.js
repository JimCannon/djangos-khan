const express = require('express');
const User = require('models/User');

const router = express.Router();

router.get('/login', function(req, res){
	res.render('login', {
		page: {
			login: true
		},
	});
});

router.post('/login', async function(req, res) {
	const rememberMe = !!req.body.rememberMe;

	try	{
		const user = await User.login(req.body);

		if (rememberMe) {
      res.cookie('userId', user._id, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } else {
      req.session.userId = user._id;
    }
	} catch (err) {
		res.status(400).render('login', {
			err,
			email: req.body.email
		});
	}
});

module.exports = router;