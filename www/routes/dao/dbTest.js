/*
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
					callback("error");
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
db.addRecord("1@1.com",25,"food","test","2010-12-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2012-12-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2013-12-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2009-12-01 12:15",function(result){console.log(result)});

*/



var db = require('./dbOperation');
//db.deleteCategory('1@1.com','test',function(result){console.log(result)});

db.deleteRecord('1@1.com','536697a4075150101b540de5',function(result){console.log(JSON.stringify(result))});
db.getRecords('1@1.com',function(result){console.log(JSON.stringify(result))});
