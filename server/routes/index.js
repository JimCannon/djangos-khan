import express from 'express';

const router = express.Router();

router.get('/', function(req,res) {
	console.log(req.session.userId);
	res.render('index', {
		page: {
			index: true
		},
	});
});

module.exports = router;