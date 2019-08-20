import User from 'models/User';

export async function isAuth(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	} else {
		if (req.cookies && req.cookies.userId) {
			try {
				const user = await User.findById(req.cookies.userId);
				req.session.userId = req.cookies.userId;
				return next();
			} catch(err) {
				delete req.session.userId;
				res.cookie('userId', '', { expires: new Date(0) });
				console.log(err);
			}
		}
	}

	res.status(401).render('unauthorized');
}