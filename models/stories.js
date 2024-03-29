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

exports.update_stories_model = function(stories_id,title,given_case,when_case,then_case,callback) {
	let query = `UPDATE stories SET title = '${title}', given_case = '${given_case}', when_case = '${when_case}', then_case = '${then_case}' WHERE stories_id = ${stories_id}`;

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}
		
		return callback(rows);
	});
}

exports.next_stories_index_model = function(callback) {
	let query = `SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'stories' AND table_schema = DATABASE( )`; 

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}
		
		return callback(rows);
	});
}
