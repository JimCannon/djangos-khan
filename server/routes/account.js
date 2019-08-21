import express from 'express';
import User from 'models/User';
import { isLoggedIn } from 'helpers';

const router = express.Router();

router.get('/', isLoggedIn, async function(req, res) {
	try {
		const user = await User.findById(req.session.userId);

		res.render('account', {
			user,
			page: {
				account: true,
				title: 'Account',
			},
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

module.exports = router;