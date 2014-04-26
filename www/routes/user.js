exports.info = function(req, res) {
	// send profile information
	res.send({username:"", profile:{dob:"2014-4-26", gender:"Male"}})
}

exports.update = function(req, res) {
	// update profile information
}