const { show_stories_model } = require('../models');

module.exports = {
    show_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	},

	create_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	},

	destroy_stories: (req, res) => {
		show_stories_model(function(result){
			console.log(result);
			res.json(result);
		});
	}
};
