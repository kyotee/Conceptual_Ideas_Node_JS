import React, { Component } from 'react';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	componentDidMount() {

	}
	render() {
		return (
			<div className="user-story">
				<div className="title-container">
					<div className="title-image"></div>
					<p className="title">Conceptual Idea</p>
				</div>
				<div className="title-line"></div>
				<div className="story-body">
					<p>Given</p>
					<p>A problem emerges.</p>
					<p>When</p>
					<p>Time is scarce.</p>
					<p>Then</p>
					<p>I must deal with it immediately.</p>
				</div>
			</div>
		)
	}
}

export default UserStories;
