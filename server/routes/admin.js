import express from 'express';
import User from 'models/User';
import Role from 'models/Role';
import Resource from 'models/Resource';
import Permission from 'models/Permission';
import Auth from 'models/Auth';
import { isLoggedIn, getAuth } from 'helpers';

const router = express.Router();

router.get('/', isLoggedIn, getAuth, async function(req, res) {
	try {
		const users = await User.find().populate('role');
		const roles = await Role.find();
		const resources = await Resource.find();
		const permissions = await Permission.find();
		const auth = await Auth.find().populate('role').populate('resource').populate('permission');

		res.render('admin', {
			users,
			roles,
			resources,
			permissions,
			auth,
			page: {
				admin: true,
				title: 'Admin',
			},
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

module.exports = router;