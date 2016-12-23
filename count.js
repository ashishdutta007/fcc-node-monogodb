var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var ageArg = Number(process.argv[2]);

//count number of docs matching the query
mongo.connect(url, function(error, db) {
	if (error) {
		console.log(error);
	}
	else {
		var parrots = db.collection('parrots');
		parrots.count({
			age: {
				$gt: ageArg
			}
		}, function(error, count) {
			if (error) {
				console.log(error);
			}
			else {
				console.log(count);
			}
			db.close();
		});
	}
});
