import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('scores', {
  	scores: [
	  	'1-0',
	  	'2-2',
	  	'0-4',
	  	'0-5',
  	]
  });
});

module.exports = router;