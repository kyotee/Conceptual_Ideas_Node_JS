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
		this.deleteUserStory = this.deleteUserStory.bind(this);
		this.editUserStory = this.editUserStory.bind(this);
	}
	componentDidMount() {

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
	deleteUserStory(stories_id) {
		if (this.props.storyCount > 0) {
			this.props.deleteStoryCount(this.props.storyCount-1);
			this.props.deleteStory(stories_id);

			axios.delete(`/api/delete_story`, { 
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
	editUserStory(stories_id,title,given_case,when_case,then_case) {
		for(let index=0; index < this.props.stories.length; index++) {
			if (this.props.stories[index].stories_id == stories_id) {
				// this.props.editStory(stories_id,title,given_case,when_case,then_case);
			}
		}
	}
	stories(storyCount,stories) {
		let currentStories = [];

		console.log(storyCount);
		console.log(stories);
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
								  parentDelete={this.deleteUserStory}
								  parentEdit={this.editUserStory}
				/>
			);
		}

		return currentStories;
	}
	render() {
		const { storyCount,addStoryCount,deleteStoryCount,stories,addStory,editStory,deleteStory,setEditState,editStates,isProduction } = this.props;
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
  editStates: PropTypes.array.isRequired,
  isProduction: PropTypes.bool.isRequired
};

export default UserStoriesList;
