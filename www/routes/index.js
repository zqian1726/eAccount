
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
	res.render('home', {
  	title: 'This is eAccount homepage'
  })
}

exports.signin = function(req, res) {
	// log in
	res.render('signin')
}

exports.signup = function(req, res) {
	// register
	res.render('signup')
}