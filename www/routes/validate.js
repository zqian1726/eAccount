var db = require('./dao/dbOperation')
  , sha1 = require('sha1')
	, validator = require('validator')

exports.email = function(req, res) {
	// check email address is not used
	availableEmail(req.body.email, function(ret) {
		res.type('json').send(ret)
	})
}

exports.availableEmail = availableEmail = function(value, callback) {
	if (typeof callback == 'function')
		db.checkEmail(value, callback)
	else
		return false
}

exports.password = function(req, res) {
	// check password
	checkPass(req.cookies.user, req.body.password, function(ret) {
		res.type('json').send(ret)
	})
}

exports.checkPass = checkPass = function(user, pass, callback) {
	if (typeof callback == 'function')
		db.checkUser(user, sha1(pass), callback)
	else
		return false
}

exports.isEmail = function(value) {
	return validator.isEmail(value)
}

exports.striptags = function(value) {
	if (typeof value == 'undefined')
		return ""
	return value.toString().replace(/(<([^>]+)>)/ig,"")
}

exports.toFloat = function(value) {
	var number = validator.toFloat(value)
	return isNaN(number) ? 0 : number
}