import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserStoriesRedux from '../containers/userStoriesRedux.js';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import * as axios from 'axios';
import PropTypes from 'prop-types';
import "../../stylesheets/user_stories.scss";

class UserStoriesList extends Component {
	constructor(props) {
		super(props);

		this.addStory = this.addStory.bind(this);
		this.deleteStory = this.deleteStory.bind(this);
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
	addStory() {
		if (this.props.storyCount < 5)
			this.props.addStoryCount(this.props.storyCount+1);
	}
	deleteStory() {
		if (this.props.storyCount > 0)
			this.props.deleteStoryCount(this.props.storyCount-1);
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
	test() {
		axios.post(`/api/create_story`, { 
			userFirstName: "Hello" 
		})
		.then(res => {
			console.log("Story creation successful.");
		})
		.catch(error => {
			console.log("Story creation unsuccessful.");
		});
	}
	render() {
		const { storyCount,addStoryCount,deleteStoryCount,stories } = this.props;
		return (
			<div>
				<p id="printing" onClick={this.printDocument}>Print</p>
				<p id="delete-story" onClick={this.deleteStory}>Delete Story</p>
				<p id="add-story" onClick={this.addStory}>Add Story</p>
				<div id="story-print">
					{this.stories(storyCount,stories)}
				</div>
				<button className="square" onClick={() => this.test()} />
			</div>
		);
	}
}

UserStoriesList.propTypes = {
  storyCount: PropTypes.number.isRequired,
  addStoryCount: PropTypes.func.isRequired,
  deleteStoryCount: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired
};

export default UserStoriesList;
