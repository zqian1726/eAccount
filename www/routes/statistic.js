var db = require('./dao/dbOperation')

exports.index = function(req, res) {
	// statistic index page
	res.render('statistic', {
  	title: 'Statistic'
  })
}

exports.pan = function(req, res) {
	var date = req.param.date
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get pan failed!")
			res.send({error: true})
		}
		else {



			res.send({error: false, balance: 1000, recordList: ret})
		}
	})
}

exports.bar = function(req, res) {
	var date = req.param.date
}

exports.line = function(req, res) {
	var period = req.param.period
		, date = req.param.date
	
}