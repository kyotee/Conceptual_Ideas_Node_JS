const { getAllTest } = require('../models');

module.exports = {
	// index
    test: (req, res) => {
		// Return them as json
		let r = Math.random().toString(36).substring(7);
		res.send(r);
		console.log("random", r);
	},

	// show
    testdb: (req, res) => {
		getAllTest(function(result){
			res.send(result);
		});
	}
};
