
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
  	title: ''
  })
}

exports.home = function(req, res) {
	// render homepage
	res.render('home', {
		title: 'Home'
  })
}

exports.signin = function(req, res) {
	// log in
	res.render('signin', {
    title: ''
  })
}

exports.signup = function(req, res) {
	// register
	res.render('signup', {
    title: ''
  })
}

exports._404 = function(req, res) {
	res.status(404)
	// respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
}