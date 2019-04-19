const { isProduction } = require('./environment');
const { getAllTest } = require('./test');
const { show_stories_model,create_stories_model } = require('./stories');

module.exports = {	isProduction,
	              	getAllTest,
	              	show_stories_model,
	              	create_stories_model
	             };
