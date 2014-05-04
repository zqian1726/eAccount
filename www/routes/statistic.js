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
			var cake = {}
			for (var i = ret.length - 1; i >= 0; i--) {
				if (ret[i].datetime < date)
					break
				if (typeof cake[ret[i].category] == 'undefined')
					cake[ret[i].category] = 0
				cake[ret[i].category] += ret[i].amount
			}
			res.send({error: false, panList: cake})
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