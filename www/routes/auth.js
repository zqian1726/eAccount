var db = require('./dao/dbOperation')

/*
 * Middlewares: check authorization
 */
exports.unauthorized = function (req, res, next) {
	// if (req.session.user) {
	// 	res.redirect('/home')
	// }
	// else {
	// 	next()
	// }
	next()
}

exports.authorized = function (req, res, next) {
	// if (req.session.user) {
	// 	next()
	// }
	// else {
	// 	res.redirect('/signin')
	// }
	next()
}

/*
 * Handlers
 */
exports.signin = function(req, res) {
	// log in
	db.signin(req.body.email, req.body.password, function(error) {
		if (!error) {
			// succeed
			req.session.user = auth[req.body.email]
			res.redirect('/home')
		}
		else {
			// failed
			res.redirect('/signin')
		}
	})
}

exports.signup = function(req, res, next) {
	// register
	console.log(req.body.email)
	db.registerUser(req.body.email, req.body.username, req.body.password, req.body.dob, req.body.gender,function(error) {
		if (!error) {
			// succeed
			req.session.user = auth[req.body.email]
			res.redirect('/home')
		}
		else {
			// failed
			console.log(error)
			res.redirect('/signup')
		}
	})
}

exports.signout = function(req, res) {
	// log out
	req.session.destroy()
	res.redirect()
}

exports.validate = function(req, res) {
	// validate email address is not used
	// db.checkEmail(req.body.email, function(ret) {
		res.send(true)
	// })
}