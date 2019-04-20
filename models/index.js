const { isProduction } = require('./environment');
const { show_stories_model,create_stories_model,destroy_stories_model } = require('./stories');

module.exports = {	isProduction,
	              	show_stories_model,
	              	create_stories_model,
	              	destroy_stories_model
	             };
