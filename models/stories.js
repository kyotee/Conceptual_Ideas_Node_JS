exports.show_stories_model = function(callback) {
	let query = "SELECT * FROM stories S WHERE S.users_id = 1"; 

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}

		console.log(rows);
		
		return callback(rows);
	});
}
