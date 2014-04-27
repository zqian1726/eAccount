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
			"categories" : ['shopping',"food","rent"],
			"records" : []
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
					categories : category
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
					categories : category
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
					callback(err);
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
		collection.findOne({"email" : email},function(err, doc) {
			mongoclient.close();
				if(err){
					callback(err);
				}else{
					if(doc.records.length>0){
						doc.records.forEach(function(element){
							element.recordId=element.recordId.toString();
						});
					}
					callback(doc.records);
				}
			 
		  });
		
	});
}
//demo
//getRecords(1,function(result){console.log(JSON.stringify(result))})
//succeed:success

editCategory = function(eamil,NewCategories,oldCategory,newCatogory,callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, {
		native_parser : true
	}));
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount");
		var collection = db.collection("user");
		collection.findOne(
			{
				"email" : email,
				"categories": {$in:[category]}
			},
			function(err, doc) {
				mongoclient.close();
				if(err){
					callback(err);
				}else{
					callback("success");
					deleteCategory(email,ca)
				}
		});
		
	});
}
