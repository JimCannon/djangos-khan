import express from 'express';
import Auth from 'models/Auth';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

router.post('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		const auth = await Auth.create(req.body);
		res.json(auth);
	} catch (err) {
		res.status(400).json({ err });
	}
});

router.delete('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		await Auth.findByIdAndRemove(req.query.id);
		res.end();
	} catch (err) {
		res.status(400).json({ err });
	}
});

module.exports = router;