import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitization } from '../helpers/input_sanitization.js';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	state = { edit: false }

	constructor(props) {
		super(props);

		this.deleteUserStory = this.deleteUserStory.bind(this);
	}
	componentDidMount() {
		let title = document.getElementsByClassName('title')[this.props.position];
		let editTitle = document.getElementsByClassName('edit-title')[this.props.position];
		let bodyText = document.getElementsByClassName('body-text');
		let editBodyText = document.getElementsByClassName('edit-body-text');		
		let edit = document.getElementsByClassName('editing')[this.props.position];
		let offset = this.props.position*3;
		let deleteIcon = document.getElementsByClassName('deleting')[this.props.position];

		edit.addEventListener("click", function() {
			this.setState({ edit: !this.state.edit })

			title.classList.toggle('edit');
			editTitle.classList.toggle('edit');
			bodyText[offset+0].classList.toggle('edit');
			bodyText[offset+1].classList.toggle('edit');
			bodyText[offset+2].classList.toggle('edit');
			editBodyText[offset+0].classList.toggle('edit');
			editBodyText[offset+1].classList.toggle('edit');
			editBodyText[offset+2].classList.toggle('edit');

			if (this.state.edit) {
				editTitle.value = sanitization(title.innerHTML);
				editBodyText[offset+0].value = sanitization(bodyText[offset+0].innerHTML);
				editBodyText[offset+1].value = sanitization(bodyText[offset+1].innerHTML);
				editBodyText[offset+2].value = sanitization(bodyText[offset+2].innerHTML);
				deleteIcon.style.backgroundColor = 'grey';
			} else {
				title.innerHTML = sanitization(editTitle.value);
				bodyText[offset+0].innerHTML = sanitization(editBodyText[offset+0].value);
				bodyText[offset+1].innerHTML = sanitization(editBodyText[offset+1].value);
				bodyText[offset+2].innerHTML = sanitization(editBodyText[offset+2].value);
				deleteIcon.style.backgroundColor = '#FF6666';
			}
		}.bind(this));
	}
	deleteUserStory(stories_id) {
		if (this.state.edit == false) {
			let userStories = document.getElementsByClassName('user-story')[this.props.position];

			userStories.style.display = 'none';
			this.props.parentDelete(stories_id);
		}
	}
	editUserStory(stories_id) {
		if(!this.state.edit) {
			let editBodyText = document.getElementsByClassName('edit-body-text');
			let offset = this.props.position*3;
			let title = sanitization(document.getElementsByClassName('edit-title')[this.props.position].value);
			let given_case = sanitization(editBodyText[offset+0].value);
			let when_case = sanitization(editBodyText[offset+1].value);
			let then_case = sanitization(editBodyText[offset+2].value);

			this.props.parentEdit(stories_id,title,given_case,when_case,then_case);
		}
	}
	status() {
		return this.state.edit ? "Done" : "Edit";
	}
	render() {
		const { changeEdit,position,stories_id,users_id,title,given_case,when_case,then_case,parentDelete,parentEdit } = this.props;
		return (
			<div>
				<div className="user-story">
					<div className="user-story-container no-word-overflow">
						<div className="title-container">
							<div className="title-image"></div>
							<p className="title">{title}</p>
							<p className="deleting" onClick={() => this.deleteUserStory(stories_id)}>X</p>
							<p className="editing" onClick={() => this.editUserStory(stories_id)}>{this.status()}</p>
							<input className="edit-title" type="text" maxLength = "20"></input>
						</div>
						<div className="title-line"></div>
						<div className="story-body">
							<p className="body-font">Given</p>
							<p className="body-text">{given_case}</p>
							<input className="edit-body-text" maxLength = "49"></input>
							<p className="body-font">When</p>
							<p className="body-text">{when_case}</p>
							<input className="edit-body-text" maxLength = "49"></input>
							<p className="body-font">Then</p>
							<p className="body-text">{then_case}</p>
							<input className="edit-body-text" maxLength = "49"></input>
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
