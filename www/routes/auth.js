var db = require('./dao/dbOperation')
	, validator = require('./validate')
  , sha1 = require('sha1')
  , https = require('https')
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
	// validate

	// log in
	db.checkUser(req.body.email, sha1(req.body.password), function(ret) {
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
	validator.availableEmail(req.body.email, function(flag) {
		if (flag) {
			// register
			db.registerUser(req.body.email, validator.striptags(req.body.username), sha1(req.body.password), req.body.dob, validator.striptags(req.body.gender), function(ret) {
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
		else {
			// failed: email duplicates
			res.redirect('/')
		}
	})
	
}

exports.signout = function(req, res) {
	// log out
	// delete cookies
	res.clearCookie('user')
	res.clearCookie('passport')
	res.clearCookie('token')

	// back
	res.redirect('/')
}

exports.google = function(req, res) {
	var email = "google#" + req.body.uid
		, password = sha1("$eAcount&secret" + req.body.uid)
		, token = req.body.token
	validator.availableEmail(email, function(flag) {
		// new user: sign up
		if (flag) {
			db.registerUser(email, validator.striptags(req.body.username), password, req.body.dob, validator.striptags(req.body.gender), function(ret) {
				if (ret == "success") {
					// succeed
					res.cookie('user', email, { maxAge: default_cookie_time })
					res.cookie('passport', sha1(email + "#This%is%eAcount%secret#"), { maxAge: default_cookie_time })
					res.cookie('token', token, { maxAge: default_cookie_time })
					res.send({error: false})
				}
				else {
					// failed
					res.send({error: true})
				}
			})
		}
		// exist user: sign in
		else {
			db.checkUser(email, password, function(ret) {
				if (ret) {
					// succeed
					res.cookie('user', email, { maxAge: default_cookie_time })
					res.cookie('passport', sha1(email + "#This%is%eAcount%secret#"), { maxAge: default_cookie_time })
					res.cookie('token', token, { maxAge: default_cookie_time })
					res.send({error: false})
				}
				else {
					// failed
					res.send({error: true})
				}
			})
		}
	})
}