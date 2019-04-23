const { isProduction } = require('./environment');
const { show_stories_model,create_stories_model,destroy_stories_model,update_stories_model,next_stories_index_model } = require('./stories');

module.exports = {	isProduction,
	              	show_stories_model,
	              	create_stories_model,
	              	destroy_stories_model,
	              	update_stories_model,
	              	next_stories_index_model
	             };
