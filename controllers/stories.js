const { show_stories_model,create_stories_model,destroy_stories_model } = require('../models');

module.exports = {
    show_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	},
	create_stories: (req, res) => {
		create_stories_model(req.body.user_id, function(result){
			console.log(result);
		});
	},
	destroy_stories: (req, res) => {
		destroy_stories_model(req.body.stories_id, function(result){
			console.log(result);
		});
	}
};
