var db = require('./dao/dbOperation')
	, validator = require('./validate')

exports.list = function(req, res) {
	// get record list
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + "get records failed!")
			res.send({error: true})
		}
		else {
			res.send({error: false, balance: 1000, recordList: ret})
		}
	})
}

exports.add = function(req, res) {
	// add a record
	db.addRecord(req.cookies.user, validator.toFloat(validator.striptags(req.body.amount)), req.body.category, validator.striptags(req.body.desc), req.body.datetime, function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + "add record failed!")
			res.send({error: true})
		}
	})
}

exports.update = function(req, res) {
	// update a record
	// 1. delete
	db.deleteRecord(req.cookies.user, req.body.recordId, function(ret) {
		if (ret == "success") {
			// 2. add
			db.addRecord(req.cookies.user, validator.toFloat(validator.striptags(req.body.amount)), req.body.category, validator.striptags(req.body.desc), req.body.datetime, function(ret) {
				if (ret == "success") {
					res.send({error: false})
				}
				else {
					console.log(req.cookies.user + "update record failed on adding!")
					res.send({error: true})
				}
			})
		}
		else {
			console.log(req.cookies.user + "update record failed on deleting!")
			res.send({error: true})
		}
	})
}

exports.delete = function(req, res) {
	// delete a record
	db.deleteRecord(req.cookies.user, req.body.recordId, function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + "delete record failed!")
			res.send({error: true})
		}
	})
}

exports.index = function(req, res) {
	// render record page
	res.render('record', {
		title: 'Record'
	})
}