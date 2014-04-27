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
	// 	res.redirect('/')
	// }
	next()
}

/*
 * Handlers
 */
exports.signin = function(req, res) {
	// log in
	db.checkUser(req.body.email, req.body.password, function(ret) {
		if (ret) {
			// succeed
			req.session.user = req.body.email
			console.log('sign up passed: ' + req.session.user)
			res.redirect('/home')
		}
		else {
			// failed
			console.log('sign up passed: ' + req.session.user)
			res.redirect('/')
		}
	})
}

exports.signup = function(req, res, next) {
	// register
	console.log(req.body.email)
	db.registerUser(req.body.email, req.body.username, req.body.password, req.body.dob, req.body.gender,function(ret) {
		if (ret == "success") {
			// succeed
			req.session.user = req.body.email
			console.log('sign up passed: ' + req.session.user)
			res.redirect('/home')
		}
		else {
			// failed
			console.log('sign up failed: ' + ret)
			res.redirect('/')
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
		db.checkEmail(req.body.email, function(ret) {
			res.type('json').send(ret);
		});
		// res.send({email: true})
	// })
}