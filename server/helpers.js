import User from 'models/User';
import Auth from 'models/Auth';
import url from 'url';

export function isLoggedIn(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	}

	res.status(401).render('unauthorized');
}

export async function checkRememberMe(req, res, next) {	
	if (req.cookies && req.cookies.userId) {
		try {
			const user = await User.findById(req.cookies.userId);
			if (!user) {
				throw new Error('No user found');
			}
			req.session.userId = req.cookies.userId;
			next();
		} catch(err) {
			console.log(err);
			delete req.session.userId;
			res.cookie('userId', '', { expires: new Date(0) });
			return res.status(401).render('unauthorized');
		}
	} else {
		next();
	}
}

export async function getAuth(req, res, next) {
	next();

	// try {
	// 	const pathname = url.parse(req.originalUrl).pathname;
	// 	const user = await User.findById(req.session.userId).populate('role');
	// 	const auth = await Auth.find({})
	// 		.populate('role', null, { name: { $eq: user.role.name }})
	// 		.populate('resource', null, { url: { $eq: pathname }})
	// 		.populate('permission', null, { method: { $eq: req.method }});

	// 	for (let i in auth) {
	// 		if (auth[i].role && auth[i].resource && auth[i].permission) {
	// 			return next();
	// 		}
	// 	}

	// 	throw new Error('Access denied');
	// } catch (err) {
	// 	res.status(401).render('unauthorized');
	// }
}