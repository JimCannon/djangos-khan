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

router.post('/login', function(req, res) {
	User.login(req.body, function(err) {
		if (err) {
			return res.render('login', {
				page: {
					login: true
				},
				error: err,
				email: req.body.email
			});
		}

		res.send('OK!');
	});
});

module.exports = router;




//function get(url, callback) {
	// when url triggers
	// callback(req, res)
//}