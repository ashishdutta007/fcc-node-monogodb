//Using mongodb node module
var mongo = require("mongodb");
var url = 'mongodb://localhost:27017/learnyoumongo';
var arg = Number(process.argv[2]);

//Using MongoClient to make a connection
mongo.MongoClient.connect(url, function(error, db) {
	if (error) {
		console.log("An error occured", error);
	}
	else {
		//returns db object ,to collection parrots 
		var parrots = db.collection('parrots');
		//Search documents with specific query in collection 
		//Returns a cursor object 'cursor' 
		var cursor = parrots.find({
			'age': {
				$gt: arg
			}
		}).toArray(function(err, docs) {
			if (err) {
				console.log("An error occurred", err);
			}
			else {
				console.log(docs);
			}
		});
		db.close();
	}
});
