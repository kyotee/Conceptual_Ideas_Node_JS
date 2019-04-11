import React, { Component } from 'react';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	componentDidMount() {

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
						</div>
						<div className="title-line"></div>
						<div className="story-body">
							<p>Given</p>
							<p>A problem emerges.</p>
							<p>When</p>
							<p>Time is scarce.</p>
							<p>Then</p>
							<p>I must deal with it immediately.</p>
						</div>
					</div>
				</div>

				 <button onClick={this.printDocument}>Print</button>
			</div>
		)
	}
}

export default UserStories;
