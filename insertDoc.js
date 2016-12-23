var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var firstname = process.argv[2];
var lastname = process.argv[3];
var data12 = {
	'firstName': firstname,
	'lastName': lastname
};
mongo.connect(url, function(error, db) {
	if (error) {
		console.log("An error occurred", error);
	}
	else {
		var docs = db.collection('docs');
		docs.insert(data12, function(error, data) {
			if (error) {
				console.log(error);
			}
			else {
				console.log(JSON.stringify(data12));
			}
		});
	}
	db.close();
});
