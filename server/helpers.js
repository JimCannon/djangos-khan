import User from 'models/User';

export function isAuth(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	}

	res.status(401).render('unauthorized');
}

export async function checkRememberMe(req, res, next) {
	if (req.cookies && req.cookies.userId) {
		try {
			const user = await User.findById(req.cookies.userId);
			req.session.userId = req.cookies.userId;
		} catch(err) {
			console.log(err);
			delete req.session.userId;
			res.cookie('userId', '', { expires: new Date(0) });
			return res.status(401).render('unauthorized');
		}
	}
}