var db = require('./dao/dbOperation')
	, validator = require('./validate')

exports.list = function(req, res) {
	// get record list
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get records failed!")
			res.send({error: true})
		}
		else {
			db.getBalance(req.cookies.user, function(num) {
				if (num == 'error') {
					console.log(req.cookies.user + " get balance failed!")
					res.send({error: true})
				}
				else {
					res.send({error: false, balance: num.balance, recordList: ret})
				}
			})
		}
	})
}

exports.add = function(req, res) {
	// add a record
	db.addRecord(req.cookies.user, validator.toFloat(validator.striptags(req.body.amount)), validator.striptags(req.body.category), validator.striptags(req.body.desc), validator.striptags(req.body.dateTime), function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + " add record failed!")
			res.send({error: true})
		}
	})
}

exports.update = function(req, res) {
	// update a record
	// 1. delete
	console.log(req.body)
	db.deleteRecord(req.cookies.user, req.body.recordId, validator.toFloat(validator.striptags(req.body.amount)), function(ret) {
		if (ret == "success") {
			// 2. add
			db.addRecord(req.cookies.user, validator.toFloat(validator.striptags(req.body.amount)), validator.striptags(req.body.category), validator.striptags(req.body.desc), validator.striptags(req.body.dateTime), function(ret) {
				if (ret == "success") {
					res.send({error: false})
				}
				else {
					console.log(req.cookies.user + " update record failed on adding!")
					res.send({error: true})
				}
			})
		}
		else {
			console.log(req.cookies.user + " update record failed on deleting!")
			res.send({error: true})
		}
	})
}

exports.delete = function(req, res) {
	// delete a record
	db.deleteRecord(req.cookies.user, req.body.recordId, req.body.amount, function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + " delete record failed!")
			res.send({error: true})
		}
	})
}

exports.index = function(req, res) {
	// render record page
	res.render('record', {
		title: 'Record',
		token: req.cookies.token
	})
}