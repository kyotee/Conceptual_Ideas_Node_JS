import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitization } from '../helpers/input_sanitization.js';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	constructor(props) {
		super(props);

		this.state = {	
			NotEdit: true,
			deleted: false,
			setTitle: '',
			setGiven: '',
			setWhen: '',
			setThen: ''
		};

		this.editUserStory = this.editUserStory.bind(this);
		this.deleteUserStory = this.deleteUserStory.bind(this);
		this.updateInformation = this.updateInformation.bind(this);
	}
	componentWillMount() {
		this.setState({ setTitle: this.props.title });
		this.setState({ setGiven: this.props.given_case });
		this.setState({ setWhen: this.props.when_case });
		this.setState({ setThen: this.props.then_case });
	}
	editUserStory(stories_id,setTitle,setGiven,setWhen,setThen) {
		if (!this.state.NotEdit) {
			this.props.parentEdit(stories_id,setTitle,setGiven,setWhen,setThen);
		}

		this.setState({ NotEdit: !this.state.NotEdit });
	}
	deleteUserStory(stories_id) {
		if (this.state.NotEdit === true) {
			this.setState({ deleted: true });
			this.props.parentDelete(stories_id);
		}
	}
	updateInformation(e) {
		let name = e.target.name;
		let value = e.target.value;

		if (name === 'title') {
			this.setState({ setTitle: value });
		} else if (name === 'given') {
			this.setState({ setGiven: value });
		} else if (name === 'when') {
			this.setState({ setWhen: value });
		} else if (name === 'then') {
			this.setState({ setThen: value });
		}
	}
	status() {
		return this.state.NotEdit ? "Edit" : "Done";
	}
	render() {
		const { NotEdit,deleted,setTitle,setGiven,setWhen,setThen,changeTitle,changeGiven,changeWhen,changeThen } = this.state;
		const { changeEdit,position,stories_id,users_id,parentDelete,parentEdit } = this.props;
		let editStory;
		let editStoryHide;
		let disappearStory;

		if (!NotEdit) {
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
							<p className="title" style={editStoryHide}>{setTitle}</p>
							<p className="deleting" onClick={() => this.deleteUserStory(stories_id)}>X</p>
							<p className="editing" onClick={() => this.editUserStory(stories_id,setTitle,setGiven,setWhen,setThen)}>{this.status()}</p>
							<input className="edit-title" style={editStory} value={setTitle} name="title" onChange={this.updateInformation} type="text" maxLength="20"></input>
						</div>
						<div className="title-line"></div>
						<div className="story-body">
							<p className="body-font">Given</p>
							<p className="body-text" style={editStoryHide}>{setGiven}</p>
							<input className="edit-body-text" style={editStory} value={setGiven} name="given" onChange={this.updateInformation} maxLength="49"></input>
							<p className="body-font">When</p>
							<p className="body-text" style={editStoryHide}>{setWhen}</p>
							<input className="edit-body-text" style={editStory} value={setWhen} name="when" onChange={this.updateInformation} maxLength="49"></input>
							<p className="body-font">Then</p>
							<p className="body-text" style={editStoryHide}>{setThen}</p>
							<input className="edit-body-text" style={editStory} value={setThen} name="then" onChange={this.updateInformation} maxLength="49"></input>
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
