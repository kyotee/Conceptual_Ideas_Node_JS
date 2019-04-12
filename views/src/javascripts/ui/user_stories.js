import React, { Component } from 'react';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import "../../stylesheets/user_stories.scss";

class UserStories extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let title = document.getElementsByClassName('title')[this.props.position];
		let editTitle = document.getElementsByClassName('edit-title')[this.props.position];
		let bodyText = document.getElementsByClassName('body-text');
		let editBodyText = document.getElementsByClassName('edit-body-text');		
		let edit = document.getElementsByClassName('editing')[this.props.position];
		let offset = this.props.position*3;

		edit.addEventListener("click", function() {
			this.props.changeEdit(!this.props.edit);
			title.classList.toggle('edit');
			editTitle.classList.toggle('edit');
			bodyText[offset+0].classList.toggle('edit');
			bodyText[offset+1].classList.toggle('edit');
			bodyText[offset+2].classList.toggle('edit');
			editBodyText[offset+0].classList.toggle('edit');
			editBodyText[offset+1].classList.toggle('edit');
			editBodyText[offset+2].classList.toggle('edit');

			if (this.props.edit) {
				editTitle.value = title.innerHTML;
				editBodyText[offset+0].value = bodyText[offset+0].innerHTML;
				editBodyText[offset+1].value = bodyText[offset+1].innerHTML;
				editBodyText[offset+2].value = bodyText[offset+2].innerHTML;
			} else {
				title.innerHTML = editTitle.value;
				bodyText[offset+0].innerHTML = editBodyText[offset+0].value;
				bodyText[offset+1].innerHTML = editBodyText[offset+1].value;
				bodyText[offset+2].innerHTML = editBodyText[offset+2].value;
			}
		}.bind(this));
	}
	printDocument() {
		const input = document.getElementsByClassName('user-story')[this.props.position];

		html2canvas(input)
			.then((canvas) => {
			    const imgData = canvas.toDataURL('image/png');
			    const pdf = new jsPDF();
			    pdf.addImage(imgData, 'JPEG', 0, 0);
			    pdf.save("user_stories.pdf");
			});
	}
	render() {
		const { edit,changeEdit } = this.props;
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
