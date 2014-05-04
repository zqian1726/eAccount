var db = require('./dao/dbOperation')
  , sha1 = require('sha1')
	, validator = require('./validate')

exports.info = function(req, res) {
	// send profile information
	db.getUserInfor(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get user info failed!")
			res.redirect('/404')
		}
		else {
			res.render('personal-info', {
				title:'User Information',
				userInfo: ret
			})
		}
	})
	
}

exports.update = function(req, res) {
	// update profile information
	db.updateUserInfo(req.cookies.user, validator.striptags(req.body.username), req.body.dob, validator.striptags(req.body.gender), function(ret) {
		if (ret == "success") {
			res.redirect('back')
		}
		else {
			console.log(req.cookies.user + " edit user info failed!")
			res.redirect('/404')
		}
	})
}

exports.reset = function(req, res) {
	// reset password
	db.changePassword(req.cookies.user, sha1(req.body.newPass), function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + " reset pass failed!")
			res.send({error: true})
		}
	})
}