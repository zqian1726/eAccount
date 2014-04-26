
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
  	title: 'This is eAccount homepage'
  })
}

exports.home = function(req, res) {
	// render homepage
}

exports.signin = function(req, res) {
	// log in
}

exports.signup = function(req, res) {
	// register
}

exports.signout = function(req, res) {
	// log out
}

exports.validate = function(req, res) {
	// validate email address is not used
	res.send({flag: true})
}