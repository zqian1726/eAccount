var db = require('./dao/dbOperation')

exports.list = function(req, res) {
	// get record list
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + "get records failed!")
			res.send({error: true})
		}
		else {
			res.send({error: false, recordList: ret})
		}
	})
}

exports.add = function(req, res) {
	// add a record
	db.addRecord(req.cookies.user, req.body.amount, req.body.category, req.body.desc, req.body.datetime, function(ret) {
		if (ret == "success") {
			res.send({error: true})
		}
		else {
			console.log(req.cookies.user + "add record failed!")
			res.send({error: false})
		}
	})
}

exports.update = function(req, res) {
	// update a record
}

exports.delete = function(req, res) {
	// delete a record
}

exports.index = function(req, res) {
	// render record page
	res.render('record', {
		title: 'Record'
	})
}