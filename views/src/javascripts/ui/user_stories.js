import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitization } from '../helpers/input_sanitization.js';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	state = { 
		edit: false,
		deleted: false,
		setTitle: '',
		setGiven: '',
		setWhen: '',
		setThen: ''
	}

	constructor(props) {
		super(props);

		this.editUserStory = this.editUserStory.bind(this);
		this.deleteUserStory = this.deleteUserStory.bind(this);
	}
	editUserStory(stories_id) {
		// need enter event listener
		// once editing complete write as props

		this.setState({ edit: !this.state.edit });

		// if (this.state.edit) {


		// } else {

		// 	this.props.parentEdit(stories_id,title,given_case,when_case,then_case);
		// }
	}
	deleteUserStory(stories_id) {
		if (this.state.edit === false) {
			this.setState({ deleted: true });
			this.props.parentDelete(stories_id);
		}
	}
	status() {
		return this.state.edit ? "Done" : "Edit";
	}
	render() {
		const { edit,deleted } = this.state;
		const { changeEdit,position,stories_id,users_id,title,given_case,when_case,then_case,parentDelete,parentEdit } = this.props;
		let editStory;
		let editStoryHide;
		let disappearStory;

		if (edit) {
			editStory = {
				display: "inline-block"
			};

			editStoryHide = {
				display: "none"				
			};
		}

		if (deleted) {
			disappearStory = {
				display: "none"
			};
		}
		return (
			<div>
				<div style={disappearStory} className="user-story">
					<div className="user-story-container no-word-overflow">
						<div className="title-container">
							<div className="title-image"></div>
							<p className="title" style={editStoryHide}>{title}</p>
							<p className="deleting" onClick={() => this.deleteUserStory(stories_id)}>X</p>
							<p className="editing" onClick={() => this.editUserStory(stories_id)}>{this.status()}</p>
							<input className="edit-title" style={editStory} type="text" maxLength = "20"></input>
						</div>
						<div className="title-line"></div>
						<div className="story-body">
							<p className="body-font">Given</p>
							<p className="body-text" style={editStoryHide}>{given_case}</p>
							<input className="edit-body-text" style={editStory} maxLength = "49"></input>
							<p className="body-font">When</p>
							<p className="body-text" style={editStoryHide}>{when_case}</p>
							<input className="edit-body-text" style={editStory} maxLength = "49"></input>
							<p className="body-font">Then</p>
							<p className="body-text" style={editStoryHide}>{then_case}</p>
							<input className="edit-body-text" style={editStory} maxLength = "49"></input>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

UserStories.propTypes = {
  changeEdit: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  stories_id: PropTypes.number.isRequired,
  users_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  given_case: PropTypes.string.isRequired,
  when_case: PropTypes.string.isRequired,
  then_case: PropTypes.string.isRequired,
  parentDelete: PropTypes.func.isRequired,
  parentEdit: PropTypes.func.isRequired
};

export default UserStories;
