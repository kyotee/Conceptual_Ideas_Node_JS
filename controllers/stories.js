const { show_stories_model,create_stories_model,destroy_stories_model,update_stories_model,next_stories_index_model } = require('../models');

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
		destroy_stories_model(req.query.stories_id, function(result){
			console.log(result);
		});
	},
	update_stories: (req, res) => {
		update_stories_model(req.body.stories_id,req.body.title,req.body.given_case,req.body.when_case,req.body.then_case, function(result){
			console.log(result);
		});
	},
	next_stories_index: (req, res) => {
		next_stories_index_model(function(result){
			console.log(result);
			res.json(result);
		});
	}
};
