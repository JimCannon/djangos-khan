import express from 'express';
import Role from 'models/Role';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

router.post('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		const role = await Role.create(req.body);
		res.json(role);
	} catch (err) {
		res.status(400).json({ err });
	}
});

router.delete('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		await Role.findByIdAndRemove(req.query.id);
		res.end();
	} catch (err) {
		res.status(400).json({ err });
	}
});

module.exports = router;