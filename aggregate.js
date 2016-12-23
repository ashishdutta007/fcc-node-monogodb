var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var sizeGiven = process.argv[2];

//Aggregation allows one to do things like calculate the sum of a field of 
//multiple documents or average of a field of documents meeting particular criteria.
mongo.connect(url, function(error, db) {
	if (error) {
		console.log(error);
	}
	else {
		var prices = db.collection('prices');
		//Using aggregate method[1st param is an array of objects or pipeline-stages meaning a chain of objects]
		//$match -- (a selector)to match and select documents with a criteria
		//$ group -- to create an alias(_id) and do actual operation on properties of documents($sum,$avg,$max,$min etc.)
		prices.aggregate([{
			$match: {
				size: sizeGiven
			}
		}, {
			$group: {
				_id: 'avg_price',
				avg: {
					$avg: '$price'
				}
			}
		}]).toArray(function(err, results) {
			if (err) {
				console.log(err);
			}
			else {
				//to be rounded off to 2 decimal places
				console.log(Number(results[0].avg).toFixed('2'));
			}
			db.close();
		});
	}
});


/*var mongo = require('mongodb').MongoClient
var size = process.argv[2]

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
	if (err) throw err
	var prices = db.collection('prices')
	prices.aggregate([{
		$match: {
			size: size
		}
	}, {
		$group: {
			_id: 'total',
			total: {
				$avg: '$price'
			}
		}
	}]).toArray(function(err, results) {
		if (err) throw err
		if (!results.length) {
			throw new Error('No results found')
		}
		var sol = results[0]
		console.log(Number(sol.total).toFixed(2))
		db.close()
	})
})
*/
