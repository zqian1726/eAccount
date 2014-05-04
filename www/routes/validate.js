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

exports.striptags = function(value) {
	if (typeof value == 'undefined')
		return ""
	return value.toString().replace(/(<([^>]+)>)/ig,"")
}

exports.toInt = function(value) {
	var number = validator.toInt(value)
	return isNaN(number) ? 0 : number
}