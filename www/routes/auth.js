var db = require('./dao/dbOperation')
  , sha1 = require('sha1')

/*
 * Middlewares: check authorization
 */
exports.unauthorized = function (req, res, next) {
	if (req.cookies.user && req.cookies.passport === sha1(req.cookies.user + "#This%is%eAcount%secret#")) {
		console.log('unlog: logged as ' + req.cookies.user)
		res.redirect('/home')
	}
	else {
		console.log('unlog: unlogged')
		next()
	}
	// next()
}

exports.authorized = function (req, res, next) {
	if (req.cookies.user && req.cookies.passport === sha1(req.cookies.user + "#This%is%eAcount%secret#")) {
		console.log('log: logged as ' + req.cookies.user)
		next()
	}
	else {
		console.log(req.session)
		console.log('log: unlogged')
		res.redirect('/')
	}
	// next()
}

/*
 * Handlers
 */
exports.signin = function(req, res) {
	// log in
	db.checkUser(req.body.email, req.body.password, function(ret) {
		if (ret) {
			// succeed
			res.cookie('user', req.body.email, { maxAge: 1000 * 60 * 60 * 2 })
			res.cookie('passport', sha1(req.body.email + "#This%is%eAcount%secret#"), { maxAge: 1000 * 60 * 60 * 2 })
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
			res.cookie('user', req.body.email, { maxAge: 1000 * 60 * 60 * 2 })
			res.cookie('passport', sha1(req.body.email + "#This%is%eAcount%secret#"), { maxAge: 1000 * 60 * 60 * 2 })
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
	console.log("Log out!")
	res.clearCookie('user');
	res.clearCookie('passport');
	res.redirect('/')
}

exports.validate = function(req, res) {
	// validate email address is not used
		db.checkEmail(req.body.email, function(ret) {
			res.type('json').send(ret)
		})
		// res.send({email: true})
	// })
}