const { show_stories_model } = require('../models');

module.exports = {
    show_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	},
	create_stories: (req, res) => {
		var user_name=req.body.userFirstName;
		console.log(user_name);
	},
	destroy_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	}
};
