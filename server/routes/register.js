const express = require('express');
const router = express.Router();

router.get('/register', function(req, res){
	res.render("register", {
		page: {
			register: true
		},
	});
});

router.post('/register', function(req, res) {
	console.log(req.body);
	res.render('register-success');
});

module.exports = router