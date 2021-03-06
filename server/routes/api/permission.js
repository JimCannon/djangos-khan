import express from 'express';
import Permission from 'models/Permission';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

router.post('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		const permission = await Permission.create(req.body);
		res.json(permission);
	} catch (err) {
		res.status(400).json({ err });
	}
});

router.delete('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		await Permission.findByIdAndRemove(req.query.id);
		res.end();
	} catch (err) {
		res.status(400).json({ err });
	}
});

module.exports = router;