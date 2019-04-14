// Execute from terminal with the following command:
// node -e 'require("./seed").seedData()'
const mysql = require('mysql');
const faker = require('faker');

const queryListTablesDelete = {
	"Delete users table.": `DROP TABLE users`
};

const queryListTables = {
	"Create users table.": `CREATE TABLE users (
							  id SERIAL,
							  name varchar(12) NOT NULL,
							  email varchar(39) NOT NULL UNIQUE,
							  password_digest varchar(75) NOT NULL,
							  PRIMARY KEY (id)
							)`
};

const queryListRecords = {
	"Insert records to users table.": `INSERT INTO users (name,email,password_digest) VALUES `
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

	Object.keys(queryListTablesDelete).forEach(function(key) {
  		querying(conLocal,queryListTablesDelete[key], key);
	})

	Object.keys(queryListTables).forEach(function(key) {
  		querying(conLocal,queryListTables[key], key);
	})

	Object.keys(queryListRecords).forEach(function(key,index) {
		switch(index)
		{
			// user table seed data
		    case 0:
		    	let usersData = [];

		    	usersData.push("('admin', 'admin@hotmail.com', 'admin1')");

		        for (let i = 0; i < 50; i++) { 
		        	usersData.push(`('${faker.name.firstName()}', '${faker.name.firstName()}@fake.com', 'password1')`);
				}
				
				queryListRecords[key] += usersData.join(", ");
		        break;
		    case 1:
		        expression;
		        break;
		    default:
		        break;
		}

  		querying(conLocal,queryListRecords[key], key);
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
