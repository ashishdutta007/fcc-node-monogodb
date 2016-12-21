var mongo = require("mongodb").MongoClient;
var arg = Number(process.argv[2]);
var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(error, db) {
	if (error) {
		console.log("An error occurred", error);
	}
	else {
		var parrots = db.collection('parrots');
		parrots.find({
			age: {
				$gt: arg
			}
		}).toArray(function() {

		});

	}
});
