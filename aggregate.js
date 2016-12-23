var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var sizeGiven = process.argv[2];


mongo.connect(url, function(error, db) {
	if (error) {
		console.log(error);
	}
	else {
		var prices = db.collection('prices');
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
