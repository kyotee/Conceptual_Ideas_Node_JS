const { isProduction } = require('../models');

module.exports = {
    environment: (req, res) => {
		isProduction(function(result){
			console.log(result);
			res.json(result);
		});
	}
};
