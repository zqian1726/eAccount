exports.map = function(req, res) {
	res.render('map', {
		title:'Map'
	})
}

exports.calendar = function(req, res) {
	res.render('calendar', {
		title:'Calendar'
	})
}