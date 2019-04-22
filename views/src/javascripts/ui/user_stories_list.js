import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserStoriesRedux from '../containers/userStoriesRedux.js';
import { eventListenerMacro } from '../helpers/event_listeners.js';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import * as axios from 'axios';
import PropTypes from 'prop-types';
import "../../stylesheets/user_stories.scss";

class UserStoriesList extends Component {
	constructor(props) {
		super(props);

		this.addUserStory = this.addUserStory.bind(this);
	}
	componentDidMount() {
		let deletingStories = this.props.stories.map(({ stories_id }) => "deleting-"+stories_id).toString().replace(/,/g, ' ');
		let editingStories = this.props.stories.map(({ stories_id }) => "editing-"+stories_id).toString().replace(/,/g, ' ');

		const deleteUserStory = (stories_id) => {
			if (this.props.storyCount > 0) {
				this.props.deleteStoryCount(this.props.storyCount-1);
				this.props.deleteStory(stories_id);

				axios.delete(`/api/delete_story`,  { 
					params: {	
								stories_id: stories_id
							} 
				})
				.then(res => {
					console.log("Story deletion successful.");
				})
				.catch(error => {
					console.log("Story deletion unsuccessful.");
				});
			}
		}

		const editUserStory = (stories_id) => {
			// use sql to find out next auto increment upon refresh

			// editStories should copy the state to be used ... pass in stories_id
			// if it works then send back request

			this.props.updateEditState(stories_id);
		}

		if (deletingStories.length > 0) {
			eventListenerMacro(`${deletingStories}`, 'click', function(e) {
				deleteUserStory(parseInt(this.id.split('-')[1]));
			});
		}

		if (editingStories.length > 0) {
			eventListenerMacro(`${editingStories}`, 'click', function(e) {
				editUserStory(parseInt(this.id.split('-')[1]));
			});
		}
	}
	printDocument() {
		const input = document.getElementById('story-print');

		html2canvas(input)
			.then((canvas) => {
			    const imgData = canvas.toDataURL('image/png');
			    const pdf = new jsPDF();
			    pdf.addImage(imgData, 'JPEG', 10, 10, 180, 200);  // 180x200 mm @ (10,10)mm
			    pdf.save("user_stories.pdf");
			});
	}
	addUserStory() {
		if (this.props.storyCount < 5) {
			this.props.addStoryCount(this.props.storyCount+1);
			this.props.addStory(1);    // '1' currently represents admin

			axios.post(`/api/create_story`, { 
				user_id: 1
			})
			.then(res => {
				console.log("Story creation successful.");
			})
			.catch(error => {
				console.log("Story creation unsuccessful.");
			});
		}
	}
	stories(storyCount,stories) {
		let currentStories = [];

		for (let index = 0; index < storyCount; index++) {
			currentStories.push(
				<UserStoriesRedux position={index}
								  key={index} 
								  stories_id={stories[index].stories_id}
								  users_id={stories[index].users_id}
								  title={stories[index].title}
								  given_case={stories[index].given_case}
								  when_case={stories[index].when_case}
								  then_case={stories[index].then_case}
				/>
			);
		}

		return currentStories;
	}
	render() {
		const { storyCount,addStoryCount,deleteStoryCount,stories,addStory,editStory,deleteStory,setEditState,updateEditState,editStates,isProduction } = this.props;
		return (
			<div>
				<p id="printing" onClick={this.printDocument}>Print</p>
				<p id="add-story" onClick={this.addUserStory}>Add Story</p>
				<div id="story-print">
					{this.stories(storyCount,stories)}
				</div>
			</div>
		);
	}
}

UserStoriesList.propTypes = {
  storyCount: PropTypes.number.isRequired,
  addStoryCount: PropTypes.func.isRequired,
  deleteStoryCount: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  addStory: PropTypes.func.isRequired,
  editStory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  setEditState: PropTypes.func.isRequired,
  updateEditState: PropTypes.func.isRequired,
  editStates: PropTypes.array.isRequired,
  isProduction: PropTypes.bool.isRequired
};

export default UserStoriesList;
