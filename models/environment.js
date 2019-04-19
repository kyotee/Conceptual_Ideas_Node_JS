exports.isProduction = function(callback) {
	return callback(con.config.host !== 'localhost');
}
