const { getUserStories } = require('../models');

module.exports = {
	// show
    show_stories: (req, res) => {
		getUserStories(function(result){
			console.log(result);
			res.json(result);
		});
	}
};
