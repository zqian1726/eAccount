var db = require('./dao/dbOperation')
	, validator = require('validator')

exports.email = function(req, res) {
	// check email address is not used
	hasEmail(req.body.email, function(ret) {
		res.type('json').send(ret)
	})
}

exports.hasEmail = hasEmail
var hasEmail = function(value, callback) {
	if (typeof callback == 'function')
		db.checkEmail(value, callback)
	else
		return ret
}

exports.isEmail = function(value) {
	return validator.isEmail(value)
}

exports.isInt = function(value) {
	return validator.isInt(value)
}