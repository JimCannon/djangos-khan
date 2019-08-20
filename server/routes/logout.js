import express from 'express';

const router = express.Router();

router.get('/', function(req, res){
	delete req.session.userId;
	res.cookie('userId', '', { expires: new Date(0) });
	res.redirect('/');
});

module.exports = router;