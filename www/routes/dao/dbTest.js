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
db.addRecord("1@1.com",25,"food","test","2010-01-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2012-01-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2013-01-01 12:15",function(result){console.log(result)});
db.addRecord("1@1.com",25,"food","test","2014-01-01 12:15",function(result){console.log(result)});

*/



var db = require('./dbOperation');
//db.deleteCategory('1@1.com','test',function(result){console.log(result)});
//db.editCategory('1@1.com',[{name:'food', line: 40},{name: 'shopping', line: 50}],function(result){console.log(result)})
//db.deleteRecord('1@1.com','536697a4075150101b540de5',function(result){console.log(JSON.stringify(result))});
//db.getRecords('1@1.com',function(result){console.log(JSON.stringify(result))});
//db.getRecordsRange('qwe8@qwe.com',"2014-05-00 00:00",function(result){console.log(JSON.stringify(result))}); 
//db.deleteRecord("1@1.com","536c34d2ce0df2fc281a9d23",25,function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-25,"food","for food","2014-01-11 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-65,"shopping","for shopping","2014-01-21 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-35,"other","for other","2014-01-7 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-95,"rent","for rent","2014-01-6 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",420,"income","for income","2014-01-3 14:11",function(result){console.log(result)});

db.addRecord("qwe@qwe.com",-15,"food","for food","2014-02-6 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-125,"shopping","for shopping","2014-02-11 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-25,"other","for other","2014-02-13 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-64,"rent","for rent","2014-02-14 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",500,"income","for income","2014-02-15 14:11",function(result){console.log(result)});

db.addRecord("qwe@qwe.com",-45,"food","for food","2014-03-11 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-625,"shopping","for shopping","2014-03-11 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-15,"other","for other","2014-03-11 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-125,"rent","for rent","2014-03-11 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",1252,"income","for income","2014-03-11 14:11",function(result){console.log(result)});

db.addRecord("qwe@qwe.com",-53,"food","for food","2014-04-11 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-91,"shopping","for shopping","2014-04-11 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-31,"other","for other","2014-04-11 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-225,"rent","for rent","2014-04-11 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",825,"income","for income","2014-04-11 14:11",function(result){console.log(result)});

db.addRecord("qwe@qwe.com",-15,"food","for food","2014-05-01 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-85,"shopping","for shopping","2014-05-02 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-33,"other","for other","2014-05-03 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-32,"rent","for rent","2014-05-04 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-85,"food","for food","2014-05-05 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-55,"food","for food","2014-05-06 12:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-82,"shopping","for shopping","2014-05-07 05:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",525,"income","for income","2014-05-07 14:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-33,"other","for other","2014-05-08 06:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-121,"rent","for rent","2014-05-09 13:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",345,"income","for income","2014-05-10 14:11",function(result){console.log(result)});
db.addRecord("qwe@qwe.com",-150,"shopping","for rent","2014-05-01 13:11",function(result){console.log(result)});
