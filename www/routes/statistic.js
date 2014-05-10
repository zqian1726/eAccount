var db = require('./dao/dbOperation')

exports.index = function(req, res) {
	// statistic index page
	res.render('statistic', {
  	title: 'Statistic',
		token: req.cookies.token
  })
}

exports.pan = function(req, res) {
	var now = new Date()
		, month = now.getMonth() + 1
		, endTime = now.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-00 00:00'
	db.getRecords(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + " get pan failed!")
			res.send({error: true})
		}
		else {
			var cake = {}
				, list = []
			for (var i = ret.length - 1; i >= 0; i--) {
				if (ret[i].dateTime < endTime)
					break
				if (ret[i].category == 'income')
					continue
				if (typeof cake[ret[i].category] == 'undefined')
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
		, month = now.getMonth() + 1
		, endTime = now.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-00 00:00'
	db.getCategories(req.cookies.user, function(categoryList) {
		if (categoryList == "error") {
			console.log(req.cookies.user + " get bar failed!")
			res.send({error: true})
		}
		else {
			var alerts = {}
			for (var i = 0; i < categoryList.length; i++)
				alerts[categoryList[i].name] = categoryList[i].line
			db.getRecords(req.cookies.user, function(ret) {
				if (ret == "error") {
					console.log(req.cookies.user + " get bar failed!")
					res.send({error: true})
				}
				else {
					var cake = {}
						, list = []
					for (var i = ret.length - 1; i >= 0; i--) {
						if (ret[i].dateTime < endTime)
							break
						if (ret[i].category == 'income')
							continue
						if (typeof cake[ret[i].category] == 'undefined')
							cake[ret[i].category] = 0
						cake[ret[i].category] += ret[i].amount
					}
					for(var key in cake) {
						list.push({category: key, amount: cake[key], line: alerts[key]})
					}
					res.send({error: false, barList: list})
				}
			})
		}
	})
}

exports.line = function(req, res) {
	var period = req.params.period
		, now = new Date()
		, endTime = ''
	if (period == 'weekly') {
		var past = new Date(now.getTime() - now.getDay() * 24 * 3600 * 1000)
			, month = past.getMonth() + 1
			, day = past.getDate()
		endTime = past.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' 00:00'
	}
	else if (period == 'monthly') {
		var month = now.getMonth() + 1
		endTime = now.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-00 00:00'
	}
	else if (period == 'yearly') {
		endTime = now.getFullYear() + '-00-00 00:00'
	}
	else {
		res.send({error: true})
		return
	}
	db.getCategories(req.cookies.user, function(categoryList) {
		if (categoryList == "error") {
			console.log(req.cookies.user + " get line failed!")
			res.send({error: true})
		}
		else {
			var alert = 0
			for (var i = 0; i < categoryList.length; i++)
				if (categoryList[i].name != 'income')
					alert += categoryList[i].line
			db.getRecords(req.cookies.user, function(ret) {
				if (ret == "error") {
					console.log(req.cookies.user + " get line failed!")
					res.send({error: true})
				}
				else {
					var cutPoint = period == 'yearly' ? 7 : 10
						, cake = {}
						, list = []
					console.log(endTime)
					for (var i = ret.length - 1; i >= 0; i--) {
						console.log('dateTime: ' + ret[i].dateTime)
						if (ret[i].dateTime < endTime)
							break
						var date = ret[i].dateTime.slice(0, cutPoint)
						console.log(date)
						if (typeof cake[date] == 'undefined')
							cake[date] = 0
						cake[date] += ret[i].amount
					}
					console.log(cake)
					res.send({error: false, line: alert, lineList: cake})
				}
			})
		}
	})
}