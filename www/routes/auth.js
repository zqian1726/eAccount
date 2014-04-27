var db = require('./dao/dbOperation')

/*
 * Middlewares: check authorization
 */
exports.unauthorized = function (req, res, next) {
	if (req.session.user) {
		console.log('unlog: logged as ' + req.session.user)
		res.redirect('/home')
	}
	else {
		console.log('unlog: unlogged')
		next()
	}
	// next()
}

exports.authorized = function (req, res, next) {
	if (req.session.user) {
		console.log('log: logged as ' + req.session.user)
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
			req.session.user = req.body.email
			console.log(req.session)
			res.redirect('/home')
			console.log(req.session)
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
			req.session.user = req.body.email
			console.log(req.session)
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
	req.session.destroy()
	res.redirect()
}

exports.validate = function(req, res) {
	// validate email address is not used
		db.checkEmail(req.body.email, function(ret) {
			res.type('json').send(ret)
		})
		// res.send({email: true})
	// })
}