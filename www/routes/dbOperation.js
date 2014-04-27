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


function registerUser(email, username, password, dob, gender, callback){
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
			"categories" : [],
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

function checkEmail(email, callback){
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

function addCategory(email,category,callback){
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

addCategory(1,"1",function(result){console.log(result)})
