import React, { Component } from 'react';
import UserStoriesRedux from '../containers/userStoriesRedux.js';
import "../../stylesheets/user_stories_list.scss";

class UserStoriesList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	render() {
		return (
			<div>
				<UserStoriesRedux position={0} />
				<UserStoriesRedux position={1} />
				<UserStoriesRedux position={2} />
			</div>
		);
	}
}

export default UserStoriesList;
