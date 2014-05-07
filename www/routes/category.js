var db = require('./dao/dbOperation')
	, validator = require('./validate')

exports.list = function(req, res) {
	// get category list
	db.getCategories(req.cookies.user, function(ret) {
		if (ret == "error") {
			console.log(req.cookies.user + "get categories failed!")
			res.send({error: true})
		}
		else {
			res.send({error: false, categoryList: ret})
		}
	})
}

exports.add = function(req, res) {
	// add a category
	db.addCategory(req.cookies.user, validator.striptags(req.body.name), function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + "add category failed!")
			res.send({error: true})
		}
	})
}

exports.update = function(req, res) {
	// update category list
	db.editCategory(req.cookies.user, req.body.categoryList, function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + "edit category list failed!")
			res.send({error: true})
		}
	})
}

exports.delete = function(req, res) {
	// delete a category
	db.deleteCategory(req.cookies.user, req.body.name, function(ret) {
		if (ret == "success") {
			res.send({error: false})
		}
		else {
			console.log(req.cookies.user + "delete category failed!")
			res.send({error: true})
		}
	})
}

exports.index = function(req, res) {
	// render category page
	res.render('category', {
		title: 'Category'
	})
}