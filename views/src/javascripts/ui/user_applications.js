import React, { Component } from 'react';
import ActionButton from './_action_button.js';
import apps from '../json_data/applications.js';
import "../../stylesheets/user_applications.scss";

class UserApplications extends Component {
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
						<div className="button-apps-container">
							<ActionButton text={"See Feature"} />
						</div>
					</div>
				</div>
			);
		}

		// push new (separate) Ruby on Rails project
		boxes.push(
			<div className="boxes" onClick={() => { window.open('https://conceptual-ideas.herokuapp.com/', '_blank') }} key={3}>
				<div className="header-apps">
					<p>Ruby on Rails App</p>
				</div>
				<div className="image-apps" style={{ backgroundColor: "#FFEFDB" }}>
					 <div className="idea-icon-apps"></div>​
				</div>
				<div className="describe-apps">
					<p>{apps.app[2].description}</p>
				</div>
				<div className="button-apps">
					<div className="button-apps-container">
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
