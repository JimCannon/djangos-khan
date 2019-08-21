import User from 'models/User';
import Auth from 'models/Auth';

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
	// 	const user = await User.findById(req.session.userId).populate('role');
	// 	const auth = await Auth.find({ 'resource.url': req.originalUrl, 'permission.method': req.method, role: user.role });

	// 	if (auth) {
	// 		next();
	// 	} else {
	// 		throw new Error('Access denied');
	// 	}
	// } catch (err) {
	// 	console.log(err)
	// 	res.status(401).render('unauthorized');
	// }
}