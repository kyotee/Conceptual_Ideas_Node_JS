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

		this.printDocument = this.printDocument.bind(this);
		this.addUserStory = this.addUserStory.bind(this);
		this.deleteUserStory = this.deleteUserStory.bind(this);
		this.editUserStory = this.editUserStory.bind(this);
	}
	printDocument() {
		let counter = this.props.storyCount;

		if (counter >= 1) {
			let input = document.getElementById('story-print');

			html2canvas(input)
				.then((canvas) => {
					let pdfResize;
				    let imgData = canvas.toDataURL('image/png');
				    let pdf = new jsPDF();

				    if (counter >= 4) {
				    	pdfResize = 0.9;
				    } else if (counter == 3) {
				    	pdfResize = 0.6;			    	
				    } else if (counter == 2) {
				    	pdfResize = 0.3;			    	
				    } else {
				    	pdfResize = 0.2;			    	
				    }

				    let width = pdf.internal.pageSize.getWidth()*0.7;
					let height = pdf.internal.pageSize.getHeight()*pdfResize;

				    pdf.addImage(imgData, 'JPEG', 29, 15, width, height);  // 180x200 mm @ (10,10)mm
				    pdf.save("user_stories.pdf");
				});
		}
	}
	addUserStory() {
		if (this.props.storyCount < 5) {
			this.props.addStoryCount(this.props.storyCount+1);
			this.props.addStory(1);  // '1' currently represents admin

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
		for (let index = 0; index < this.props.stories.length; index++) {
			if (this.props.stories[index].stories_id == stories_id) {
				axios.put(`/api/edit_story`, { 
					stories_id: stories_id,
					title: title,
					given_case: given_case,
					when_case: when_case,
					then_case: then_case
				})
				.then(res => {
					console.log("Story edit successful.");
				})
				.catch(error => {
					console.log("Story edit unsuccessful.");
				});
			}
		}
	}
	stories(stories) {
		let currentStories = [];

		for (let index = 0; index < stories.length; index++) {
			currentStories.push(
				<UserStoriesRedux key={index} 
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
		const { stories,storyCount } = this.props;
		let noPrinting;
		let noStories;

		if (storyCount < 1) {
			noPrinting = {
				backgroundColor: "grey"
			};
		}

		if (storyCount > 4) {
			noStories = {
				backgroundColor: "grey"
			};
		}
		return (
			<div>
				<div id="function-buttons">
					<p id="add-story" style={noStories} onClick={this.addUserStory}>Add Story</p>
					<p id="printing" style={noPrinting} onClick={this.printDocument}>Print</p>
				</div>
				<div id="story-print">
					{this.stories(stories)}
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
