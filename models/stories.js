exports.show_stories_model = function(callback) {
	let admin_id = con.config.host == 'localhost' ? 1 : 2;  // clearDB increments by 10 at 2
	let query = `SELECT * FROM stories S WHERE S.users_id = ${admin_id}`; 

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}

		console.log(rows);
		
		return callback(rows);
	});
}
