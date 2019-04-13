// Execute from terminal with the following command:
// node -e 'require("./seed").seedData()'
const mysql = require('mysql');
const faker = require('faker');

const queryList = {
	"Delete all records from users table.": "DELETE FROM `users`"
};

const querying = (connection,query,status) => {
	connection.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}

		console.log(status);
	});
}

exports.seedData = function() {
	console.log("Seeding database ...");

	const conLocal = mysql.createConnection({
		// local database for development
		host     : 'localhost',
		user     : 'admin',
		password : 'admin1',
		database : 'conceptual_ideas_node_db'
	});

	conLocal.connect((err) => {
		if(err){
			console.log('Error connecting to Db');
		return;
	}
		console.log('-Local database connection established.-');
	});

	Object.keys(queryList).forEach(function(key) {
  		querying(conLocal,queryList[key], key);
	})

	conLocal.end();
	console.log("");

	// const conProduction = mysql.createConnection({
	//     // server database for production
	//     host     : 'us-cdbr-iron-east-03.cleardb.net',
	//     user     : 'b1716937e432f2',
	//     password : '5bb18616',
	//     database : 'heroku_9705d094c064be3'
	// });	

	// conProduction.connect((err) => {
	// 	if(err){
	// 		console.log('Error connecting to Db');
	// 	return;
	// }
	// 	console.log('-Production database connection established.-');
	// });

	// conProduction.end();
	// console.log("");
}
