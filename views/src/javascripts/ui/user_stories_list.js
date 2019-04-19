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
	}
	componentDidMount() {
		let editingStories = this.props.stories.map(({ stories_id }) => "editing-"+stories_id).toString().replace(/,/g, ' ');
		
		const addRemoveStory = (story) => {

		}

		eventListenerMacro(`${editingStories}`, 'click', function(e) {
			// alert(this.id);
			// addRemoveStory();
		});
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
	deleteUserStory() {
		if (this.props.storyCount > 0) {
			this.props.deleteStoryCount(this.props.storyCount-1);
			// to be delete and moved to "addRemoveStory"
			// axios request
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
		const { storyCount,addStoryCount,deleteStoryCount,stories,addStory,deleteStory,isProduction } = this.props;
		return (
			<div>
				<p id="printing" onClick={this.printDocument}>Print</p>
				<p id="delete-story" onClick={this.deleteUserStory}>Delete Story</p>
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
  deleteStory: PropTypes.func.isRequired,
  isProduction: PropTypes.bool.isRequired
};

export default UserStoriesList;
