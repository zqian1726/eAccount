var db = require('./dao/dbOperation')
  , sha1 = require('sha1')
  , default_cookie_time = 1000 * 60 * 60 * 2; // 2 hour

/*
 * Middlewares: check authorization
 */
exports.unauthorized = function (req, res, next) {
	if (req.cookies.user && req.cookies.passport === sha1(req.cookies.user + "#This%is%eAcount%secret#")) {
		res.redirect('/home')
	}
	else {
		next()
	}
}

exports.authorized = function (req, res, next) {
	if (req.cookies.user && req.cookies.passport === sha1(req.cookies.user + "#This%is%eAcount%secret#")) {
		next()
	}
	else {
		res.redirect('/')
	}
}

/*
 * Handlers
 */
exports.signin = function(req, res) {
	// log in
	db.checkUser(req.body.email, req.body.password, function(ret) {
		if (ret) {
			// succeed
			res.cookie('user', req.body.email, { maxAge: default_cookie_time })
			res.cookie('passport', sha1(req.body.email + "#This%is%eAcount%secret#"), { maxAge: default_cookie_time })
			res.redirect('/home')
		}
		else {
			// failed
			res.redirect('/')
		}
	})
}

exports.signup = function(req, res, next) {
	// register
	db.registerUser(req.body.email, req.body.username, req.body.password, req.body.dob, req.body.gender,function(ret) {
		if (ret == "success") {
			// succeed
			res.cookie('user', req.body.email, { maxAge: default_cookie_time })
			res.cookie('passport', sha1(req.body.email + "#This%is%eAcount%secret#"), { maxAge: default_cookie_time })
			res.redirect('/home')
		}
		else {
			// failed
			res.redirect('/')
		}
	})
}

exports.signout = function(req, res) {
	// log out
	res.clearCookie('user');
	res.clearCookie('passport');
	res.redirect('/')
}