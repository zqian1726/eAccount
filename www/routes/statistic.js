var db = require('./dao/dbOperation')

exports.index = function(req, res) {
	// statistic index page
	res.render('statistic', {
  	title: 'Statistic'
  })
}

exports.pan = function(req, res) {
	var now = new Date()
		, endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-00 ' + now.getHours() + ':' + now.getMinutes()
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get pan failed!")
			res.send({error: true})
		}
		else {
			var cake = {}
				, list = []
			for (var i = ret.length - 1; i >= 0; i--) {
				if (ret[i].datetime < endTime)
					break
				if (typeof cake[ret[i].i] == 'undefined')
					cake[ret[i].category] = 0
				cake[ret[i].category] += ret[i].amount
			}
			for(var key in cake) {
				list.push({category: key, amount: cake[key], line: 1000})
			}
			res.send({error: false, panList: list})
		}
	})
}

exports.bar = function(req, res) {
	var now = new Date()
		, endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-00 ' + now.getHours() + ':' + now.getMinutes()
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get bar failed!")
			res.send({error: true})
		}
		else {
			var cake = {}
				, list = []
			for (var i = ret.length - 1; i >= 0; i--) {
				if (ret[i].datetime < endTime)
					break
				if (typeof cake[ret[i].i] == 'undefined')
					cake[ret[i].category] = 0
				cake[ret[i].category] += ret[i].amount
			}
			for(var key in cake) {
				list.push({category: key, amount: cake[key], line: 1000})
			}
			res.send({error: false, barList: list})
		}
	})
}

exports.line = function(req, res) {
	var period = req.param.period
		, date = req.param.date

}