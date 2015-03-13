var MongoClient = require('mongodb').MongoClient;

exports.screen = function (req, res) {

	if(req.param("id") != undefined) {
	    var screedIdParam = req.param("id");


	    MongoClient.connect("mongodb://localhost:27017/DB", function (err, db) {
	        var collection = db.collection('msg');
	        console.log('Get Message Collection');
	        collection.find({ "screen": parseInt(screedIdParam) }).toArray(function (err, docs) {
	            console.log('screens by ' + screedIdParam);
	            db.close();
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                /* The response type should be a JSON */
                res.write(JSON.stringify(docs));
                res.end();
	        });
	    });
	    
		//var collection = db.get('msg');
		
		//message.find("screen = " + req.param("id")).exec(function (err, messageDoc) {
		//	mongoMessage = messageDoc;
		//	console.log(messageDoc);
		//});

	}
};