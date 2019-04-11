import React, { Component } from 'react';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	componentDidMount() {
		let title = document.getElementsByClassName('title')[0];
		let editTitle = document.getElementsByClassName('edit-title')[0];
		let bodyText = document.getElementsByClassName('body-text');
		let EditBodyText = document.getElementsByClassName('edit-body-text');		
		let edit = document.getElementsByClassName('editing')[0];

		edit.addEventListener("click", function() {
			title.classList.toggle('edit');
			editTitle.classList.toggle('edit');
			bodyText[0].classList.toggle('edit');
			bodyText[1].classList.toggle('edit');
			bodyText[2].classList.toggle('edit');
			EditBodyText[0].classList.toggle('edit');
			EditBodyText[1].classList.toggle('edit');
			EditBodyText[2].classList.toggle('edit');
		});
	}
	printDocument() {
		const input = document.getElementsByClassName('user-story')[0];

		html2canvas(input)
			.then((canvas) => {
			    const imgData = canvas.toDataURL('image/png');
			    const pdf = new jsPDF();
			    pdf.addImage(imgData, 'JPEG', 0, 0);
			    pdf.save("user_stories.pdf");
			});
	}
	render() {
		return (
			<div>
				<div className="user-story">
					<div className="user-story-container">
						<div className="title-container">
							<div className="title-image"></div>
							<p className="title">Conceptual Idea</p>
							<input className="edit-title" type="text"></input>
						</div>
						<div className="title-line"></div>
						<div className="story-body">
							<p className="body-font">Given</p>
							<p className="body-text">A problem emerges.</p>
							<input className="edit-body-text"></input>
							<p className="body-font">When</p>
							<p className="body-text">Time is scarce.</p>
							<input className="edit-body-text"></input>
							<p className="body-font">Then</p>
							<p className="body-text">I must deal with it immediately.</p>
							<input className="edit-body-text"></input>
						</div>
					</div>
				</div>

				<p className="printing" onClick={this.printDocument}>Print</p>
				<p className="editing">Edit</p>
			</div>
		)
	}
}

export default UserStories;
