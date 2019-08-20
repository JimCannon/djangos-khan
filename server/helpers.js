export function isAuth(req, res, next) {
	if (req.session.userId) {
		return next();
	}

	res.status(401).render('unauthorized');
}