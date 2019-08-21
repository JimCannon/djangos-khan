import express from 'express';
import Resource from 'models/Resource';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

router.post('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		const resource = await Resource.create(req.body);
		res.json(resource);
	} catch (err) {
		res.status(400).json({ err });
	}
});

router.delete('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		await Resource.findByIdAndRemove(req.query.id);
		res.end();
	} catch (err) {
		res.status(400).json({ err });
	}
});

module.exports = router;