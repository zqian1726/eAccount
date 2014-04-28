exports.info = function(req, res) {
	// send profile information
	res.render('personal-info', {
		title:'User Information',
		username: 'UserABC',
		profile: {
			dob: '2014-4-26',
			gender: 'Male'
		}
	})
}

exports.update = function(req, res) {
	// update profile information
}