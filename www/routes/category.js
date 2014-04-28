var db = require('./dao/dbOperation')

exports.list = function(req, res) {
	// get category list
	db.getCategories(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + "gets category failed!")
			res.send({error: "error", categoryList: ret})
		}
		else {
			res.send({categoryList: ret})
		}
	})
}

exports.add = function(req, res) {
	// add a category
}

exports.update = function(req, res) {
	// update a category
}

exports.delete = function(req, res) {
	// delete a category
}

exports.index = function(req, res) {
	// render category page
	res.render('category', {
		title: 'Category'
	})
}