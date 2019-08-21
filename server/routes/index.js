import express from 'express';

const router = express.Router();

router.get('/', function(req,res) {
	res.render('index', {
		page: {
			index: true,
			title: 'Index',
		},
	});
});

module.exports = router;