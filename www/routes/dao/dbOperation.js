var Db = require('mongodb').Db, 
MongoClient = require('mongodb').MongoClient, 
Server = require('mongodb').Server, 
ReplSetServers = require('mongodb').ReplSetServers, 
ObjectID = require('mongodb').ObjectID, 
Binary = require('mongodb').Binary, 
GridStore = require('mongodb').GridStore, 
Code = require('mongodb').Code, 
BSON = require('mongodb').pure().BSON, 
assert = require('assert');


exports.registerUser = function(email, username, password, dob, gender, callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.insert({
			"email" : email,
			"username" : username,
			"password" : password,
			"dob" : dob,
			"gender" : gender,
			"categories" : [
				{'name' : 'income','line' : 0 },
				{'name' : 'shopping','line' : 0},
				{'name' : 'food','line' : 0},
				{'name' : 'rent','line' : 0},
				{'name' : 'other','line' : 0}
			],
			"records" : [],
			"balace" : 0
		},function(err, result) {
			mongoclient.close();
			if(err){
				callback(err);
			}else{
				callback("success");
			}
		});
		
	});
	
}
//demo
//registerUser(1,2,3,4,5,function(result){console.log(result)})
//succeed:success

exports.changePassword = function(email,newPassword,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$set : {
					password : newPassword
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}
//demo
//changePassword("1@1.com","xs",function(result){console.log(result)});
//succeed:success or error message

exports.getUserInfor = function(email,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.findOne({"email" : email}, {_id:0, username:1, dob:1, gender:1}, function(err, doc) {
			mongoclient.close();
			if(err)		
			  callback("error"); 	
			else
			  callback(doc);
		});
		
	});
}
//demo
//getUserInfor("1@1.com",function(result){console.log(JSON.stringify(result))});
//retun"error" means error..if null means not found, or it will return like {"dob":2,"gender":3,"username":123}


exports.updateUserInfo = function(email,newUsername,newDob,newGender,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$set : {
					username : newUsername,
					dob : newDob,
					gender : newGender
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}
//demo
//updateUserInfo("1@1.com","test","04/28/2014","man",function(result){console.log(result)});
//succeed:success 

exports.checkUser = function (email,password,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.findOne({"email" : email,"password" : password}, function(err, doc) {
			mongoclient.close();
			if(doc==null)		
			  callback(false); 	
			else
				callback(true);
				
		});
		
	});
}
//demo
//checkUser(1,3,function(result){console.log(result)});
//true: user exist,false: user not exist


exports.checkEmail = function (email, callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.findOne({"email" : email}, function(err, doc) {
			mongoclient.close();
			if(doc==null)		
			  	return callback(true); 	
			else
				return callback(false);
				
		});
		
	});
	
}
//demo
//checkEmail("2",function(result){console.log(result)});
//true: unique,false: exist

var addCategory = function (email,category,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$addToSet : {
					categories : {
						'name' : category,
						'line' : 0
					}
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}
exports.addCategory=addCategory;
//demo
//addCategory(1,"3",function(result){console.log(result)})
//succeed:success

exports.editCategory = function(email,newCategories,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$set:{
					categories : newCategories
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
					
				}
		});
		
	});
}

updateCategoryInRecords = function(email,oldCategory,newCatogory,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{},
			{
				$set:
				{
					categories : newCategories
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
					
				}
		});
		
	});
}
/*
editCategory("1@1.com",['food','rent'],1,2,function(result){
	console.log(result);
})
*/ 

var deleteCategory = function(email,category,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$pull : {
					categories : {'name' : category}
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}
exports.deleteCategory=deleteCategory;
//demo
//deleteCategory(1,"2",function(result){console.log(result)})
//succeed:success

exports.getCategories = function (email,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.findOne({"email" : email},function(err, doc) {
			mongoclient.close();
				if(err){
					callback("error");
				}else{
					callback(doc.categories);
				}
			 
		  });
		
	});
}
//demo
//getCategories(1,function(result){console.log(JSON.stringify(result))})
//succeed:success

exports.addRecord = function(email,amount,category,desc,dateTime,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$push : {
					"records" : {
						"recordId" : new ObjectID(),
						"amount" : amount,
						"category" : category,
						"desc" : desc,
						"dateTime" : dateTime
					}
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}

//demo
//addRecord("1@1.com",25,"food","test","04/27/2014 14:25",function(result){console.log(result)});
//succeed:success

exports.getRecords = function(email,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.aggregate(
		[
			{$match: { email: email } },
			{$unwind: '$records' },
			{$sort: {"records.dateTime":1}}, 
			{$group: {  _id: email,records: {$push:"$records"} } }
		],function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					if(JSON.stringify(doc)=='[]')
						callback([]);
					else
						callback(doc[0].records);
				}
		});
		
	});
}
//demo
//getRecords(1,function(result){console.log(JSON.stringify(result))})
//return an array

exports.deleteRecord = function(email,recordId,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.update(
			{
				"email" : email
			},
			{
				$pull : {
					"records" : {
						"recordId" : new ObjectID(recordId)
					}
				}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
				}
		});
		
	});
}

