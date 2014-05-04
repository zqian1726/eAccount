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


exports.getRecords = function(email, callback){
	var mongoclient = new MongoClient(new Server("localhost", 27017, { native_parser : true }))
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("eAccount")
		var collection = db.collection("user")
		collection.findOne({"email": email}, function(err, doc) {
			mongoclient.close()
			if(err){
				callback("error")
			}else{
				if(doc.records.length>0){
					doc.records.forEach(function(element){
						element.recordId=element.recordId.toString();
					});
				}
				callback(doc.records);
			}	 
	  })
	})
}