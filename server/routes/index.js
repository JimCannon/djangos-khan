const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
	res.render('index', {
		page: {
			index: true
		},
	});
});

module.exports = router;