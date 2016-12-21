var mongo = require("mongodb").MongoClient;
var arg = Number(process.argv[2]);
var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(error, db) {
	if (error) {
		console.log("An error occurred", error);
	}
	else {
		//returns db objects
		var parrots = db.collection('parrots');
		parrots.find({
			age: {
				$gt: arg
			}
		}, {
			name: 1,
			age: 1,
			_id: 0
		}).toArray(function(error, docs) {
			if (error) {
				console.log("An error occured", error);
			}
			else {
				//find query results
				console.log(docs);
			}
		});
	}
	db.close();
});
