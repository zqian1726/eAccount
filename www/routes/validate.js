var db = require('./dao/dbOperation')

exports.email = function(req, res) {
	// check email address is not used
	db.checkEmail(req.body.email, function(ret) {
		res.type('json').send(ret)
	})
}

exports.category = function(req, res) {
	// check category is not used
	db.checkCategory(req.body.category, function(ret) {
		res.type('json').send(ret)
	})
}