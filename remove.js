var mongo = require("mongodb").MongoClient;
var database = process.argv[2];
var url = 'mongodb://localhost:27017/' + database;
var coll = process.argv[3];
var id = process.argv[4];

//remove document based on _id
mongo.connect(url, function(error, db) {
	if (error) {
		console.log("error", error);
	}
	else {
		var keys = db.collection(coll);
		keys.remove({
			_id: id
		}, function(error) {
			if (error) {
				console.log("error", error);
			}
			db.close();
		});
	}
});


/*var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/' + process.argv[2];
var col = process.argv[3];
var id = process.argv[4];

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var collection = db.collection(col);
	collection.remove({
		_id: id
	}, function(err, data) {
		if (err) throw err;
		db.close();
	});
});
*/
