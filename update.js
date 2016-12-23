var mongo = require("mongodb").MongoClient;
var database = process.argv[2];
var url = 'mongodb://localhost:27017/' + database;
//selector for finding the document to update
var selector = {
	"username": "tinatime"
};
//data to be updated in place of the old document
/*var updateData = {
	"name": "Tina",
	"age": 40,
	"username": "tinatime"
}*/
var updateData = {
	$set: {
		"age": 40
	}
}

mongo.connect(url, function(error, db) {
	if (error) {
		console.log(error);
	}
	else {
		var users = db.collection('users');
		users.update(selector, updateData, function(error, data) {
			if (error) {
				console.log(error);
			}
			else {
				console.log(data);
			}
		});
	}
	db.close();
});
