// Execute from terminal with the following command:
// node -e 'require("./seed").seedData()'
const { encrypt } = require('./encryption.js');
const mysql = require('mysql');
const faker = require('faker');

const queryListTablesDelete = {
	"Delete stories table.": `DROP TABLE IF EXISTS stories`,
	"Delete users table.": `DROP TABLE IF EXISTS users`
};

const queryListTables = {
	"Create users table.": `CREATE TABLE users (
							  users_id SERIAL,
							  name varchar(12) NOT NULL,
							  email varchar(39) NOT NULL UNIQUE,
							  password_digest varchar(75) NOT NULL,
							  PRIMARY KEY (users_id)
							)`,
	"Create stories table.": `CREATE TABLE stories (
							    stories_id SERIAL,
							    users_id BIGINT UNSIGNED NOT NULL,
							    title varchar(35),
							    given_case varchar(49),
							    when_case varchar(49),
							    then_case varchar(49),
							    PRIMARY KEY (stories_id),
							    FOREIGN KEY (users_id) REFERENCES users(users_id) ON DELETE CASCADE
							)`
};

const queryListRecords = {
	"Insert records to users table.": `INSERT INTO users (name,email,password_digest) VALUES `,
	"Insert records to stories table.": `INSERT INTO stories (users_id,title,given_case,when_case,then_case) VALUES `
};

const querying = (connection,query,status) => {
	connection.query(query, (err,rows) => {
		if (err) {
			console.log(err);
		}

		console.log(status);
	});
}

exports.seedData = function() {
	let connections = [];

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

	connections.push(conLocal);

	const conProduction = mysql.createConnection({
	    // server database for production
	    host     : 'us-cdbr-iron-east-03.cleardb.net',
	    user     : 'b1716937e432f2',
	    password : '5bb18616',
	    database : 'heroku_9705d094c064be3'
	});	

	conProduction.connect((err) => {
		if(err){
			console.log('Error connecting to Db');
		return;
	}
		console.log('-Production database connection established.-');
	});

	connections.push(conProduction);

	for (let c = 0; c < connections.length; c++) {
		Object.keys(queryListTablesDelete).forEach(function(key) {
	  		querying(connections[c],queryListTablesDelete[key], key);
		})

		Object.keys(queryListTables).forEach(function(key) {
	  		querying(connections[c],queryListTables[key], key);
		})

		Object.keys(queryListRecords).forEach(function(key,index) {
			switch(index)
			{
				// user table seed data
			    case 0:
			    	let usersData = [];

			    	usersData.push("('admin', 'admin@hotmail.com', 'admin1')");

			        for (let i = 0; i < 50; i++) { 
			        	usersData.push(`('${faker.name.firstName()}', '${faker.name.firstName()}@fake${i}.com', '${encrypt("password1")}')`);
					}
					
					queryListRecords[key] += usersData.join(", ");
			        break;
			    case 1:
			        // stories table seed data
			        let storiesData = [];
			        let admin_id = connections[c].config.host == 'localhost' ? 1 : 2;  // clearDB increments by 10 at 2

	 		        for (let i = 0; i < 3; i++) { 
			        	storiesData.push(`('${admin_id}', 'Title Text', 'Given text', 'When text', 'Then text')`);
					}       

					queryListRecords[key] += storiesData.join(", ");
			        break;
			    default:
			        break;
			}

	  		querying(connections[c],queryListRecords[key], key);
		})

		connections[c].end();
		console.log("");
	}
}
