import express from 'express';
import Joi from 'joi';
import User from 'models/User';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

const schema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string().regex(/[a-zA-Z0-9!"#€%&"]{6,30}/),
	role: Joi.string(),
});

router.post('/', isLoggedIn, getAuth, async function(req, res) {
	const result = Joi.validate(req.body, schema);
	if (result.error !== null) {
		return res.status(result.error.code || 400).json({
			err: {
				message: result.error.details[0].message,
			}
		});
	}

	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (err) {
		return res.status(err.code || 400).json({ err });
	}
});

module.exports = router;