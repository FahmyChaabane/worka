const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const throwAuthError = () => {
	console.log('You are not authorized, please login')
	throw new AuthenticationError('You are not authorized, please login');
}

const authorize = (req, verify = false) => {
	const authorizationHeader = req.cookies.token || req.headers.cookie || req.headers.authorization || '';
	if (!authorizationHeader) {
		req.isAuth = false;
		console.log('auth error 1')
		return !verify ? throwAuthError() : req;

	}

	const token = authorizationHeader.replace('Bearer ', '');
	if (!token || token === '') {
		req.isAuth = false;
		console.log('auth error 2')
		return !verify ? throwAuthError() : req;
	}

	let decodedJWT;
	try {
		decodedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decodedJWT) {
			req.isAuth = false;
			console.log('auth error 3')
			return !verify ? throwAuthError() : req;
		}

		req.isAuth = true;
		req._id = decodedJWT.id;
		req.token = token;
		return req;
	} catch (err) {
		req.isAuth = false;
		console.log('auth error 4')
		return !verify ? throwAuthError() : req;
	}
}

module.exports = authorize;