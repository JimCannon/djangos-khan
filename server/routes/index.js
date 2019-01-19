const express = require('express');
const router = express.Router();
const users = require('models/users');

router.get('/index', function(req,res){
	res.render("index", {
		firstname: "foo"
	});
});

users.create({
	firstName: "foo"
}).then(function(){
		console.log('ok');
}).catch(function(err){
	console.log('fail', err);
});

module.exports = router;