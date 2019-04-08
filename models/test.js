exports.getAllTest = function(callback) {
	let query = "SELECT * FROM `employees`"; 

	con.query(query, (err,rows) => {
		if (err) {
			console.log("Database query error.");
		}

		console.log(rows);
		
		return callback(rows);
	});
}
