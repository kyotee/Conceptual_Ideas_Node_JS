import React, { Component } from 'react';
import ActionButton from './_action_button.js';
import apps from '../json_data/applications.js';

class UserApplications extends Component {
	componentDidMount() {
		for (let index = 1; index < Object.keys(apps.app).length; index++) {
			let detectButton = document.getElementById(`box-${index}`);

			detectButton.addEventListener('mouseover', function() {
				detectButton.style.transition = "transform .0.5s";
				detectButton.style.transform = "scale(1.1)";
			});

			detectButton.addEventListener('mouseout', function() {
				detectButton.style.transition = "transform .0.5s";
				detectButton.style.transform = "scale(1)";
			});
		}
	}
	applicationBoxes() {
		let boxes = [];

		for (let index = 0; index < Object.keys(apps.app).length; index++) {
			boxes.push(
				<div className="boxes" onClick={() => { window.location = `/${apps.app[parseInt(index)].route}` }} key={index}>
					<div className="header-apps">
						<p>{apps.app[index].name}</p>
					</div>
					<div className="image-apps" style={{ backgroundColor: apps.app[index].color }}>
						 <div className="idea-icon-apps"></div>​
					</div>
					<div className="describe-apps">
						<p>{apps.app[index].description}</p>
					</div>
					<div className="button-apps">
						<div className="button-apps-container" id={"box-"+index}>
							<ActionButton text={"See Feature"} />
						</div>
					</div>
				</div>
			);
		}

		// push (separate) Ruby on Rails project
		boxes.push(
			<div className="boxes" onClick={() => { window.open('https://conceptual-ideas.herokuapp.com/', '_blank') }} key={6}>
				<div className="header-apps">
					<p>Ruby on Rails App</p>
				</div>
				<div className="image-apps" style={{ backgroundColor: "#CCFFE5" }}>
					 <div className="idea-icon-apps"></div>​
				</div>
				<div className="describe-apps">
					<p>{apps.app[5].description}</p>
				</div>
				<div className="button-apps">
					<div className="button-apps-container" id={"box-"+6}>
						<ActionButton text={"See Feature"} />
					</div>
				</div>
			</div>
		);

		return boxes;
	}
	render() {
		return (
			<div id="applications">
				<ul>
					{this.applicationBoxes()}
				</ul>
			</div>
		)
	}
}

export default UserApplications;
