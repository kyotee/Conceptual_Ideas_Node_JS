exports.show_stories_model = function(callback) {
	let admin_id = con.config.host == 'localhost' ? 1 : 2;  // clearDB increments by 10 at 2
	let query = `SELECT * FROM stories S WHERE S.users_id = ${admin_id}`; 

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}
		
		return callback(rows);
	});
}

exports.create_stories_model = function(user_id,callback) {
	let admin_id = con.config.host == 'localhost' ? 1 : 2;  // clearDB increments by 10 at 2
	let query = `INSERT INTO stories (users_id,title,given_case,when_case,then_case) VALUES ('${admin_id}', 'Title Text', 'Given text', 'When text', 'Then text')`;

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}
		
		return callback(rows);
	});
}

exports.destroy_stories_model = function(stories_id,callback) {
	let query = `DELETE FROM stories WHERE stories_id = ${stories_id}`;

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}
		
		return callback(rows);
	});
}
