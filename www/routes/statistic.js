var db = require('./dao/dbOperation')

exports.index = function(req, res) {
	// statistic index page
	res.render('statistic', {
  	title: 'Statistic'
  })
}

exports.pan = function(req, res) {
	var now = new Date()
		, endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-00 00:00'
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
				list.push({label: key, value: cake[key]})
			}
			res.send({error: false, panList: list})
		}
	})
}

exports.bar = function(req, res) {
	var now = new Date()
		, endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-00 00:00'
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
	var period = req.params.period
		, now = new Date()
		, endTime = ''
	if (period == 'weekly') {
		var past = new Date(now.getTime() - now.getDay() * 24 * 3600 * 1000)
		endTime = past.getFullYear() + '-' + (past.getMonth() + 1) + '-' + past.getDate() + ' 00:00'
	}
	else if (period == 'monthly') {
		endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-00 00:00'
	}
	else if (period == 'yearly') {
		endTime = now.getFullYear() + '-00-00 00:00'
	}
	else {
		res.send({error: true})
		return
	}
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get line failed!")
			res.send({error: true})
		}
		else {
			var cutPoint = period == 'yearly' ? 6 : 9
				, cake = {}
				, list = []
			for (var i = ret.length - 1; i >= 0; i--) {
				if (ret[i].datetime < endTime)
					break
				var date = ret[i].datetime.slice(0, cutPoint)
				if (typeof cake[date] == 'undefined')
					cake[date] = 0
				cake[date] += ret[i].amount
			}
			console.log(cake)
			res.send({error: false, lineList: cake})
		}
	})
}