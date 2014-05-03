var db = require('./dao/dbOperation')

exports.list = function(req, res) {
	// get category list
	// db.getCategories(req.cookies.user, function(ret) {
	// 	if (ret == "error") {
	// 		console.log(req.cookies.user + "get categories failed!")
	// 		res.send({error: true})
	// 	}
	// 	else {
	// 		res.send({error: false, categoryList: ret})
	// 	}
	// })
	res.send({error: false, categoryList: ["Food", "Shopping", "Rent", "Pet", "Emergency"]})
}

exports.add = function(req, res) {
	// add a category
	var item = req.body.name
	db.addCategory(req.cookies.user, item, function(ret) {
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
	// update a category
	// var newItem = req.body.name
	// 	, oldItem = req.body.old
	// db.editCategory(req.cookies.user, newItem, oldItem, function(ret) {
	// 	if (ret == "success") {
	// 		res.send({error: false})
	// 	}
	// 	else {
	// 		console.log(req.cookies.user + "edit category failed!")
	// 		res.send({error: true})
	// 	}
	// })
}

exports.delete = function(req, res) {
	// delete a category
	var item = req.body.name
	db.deleteCategory(req.cookies.user, item, function(ret) {
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