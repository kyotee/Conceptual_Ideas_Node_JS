import React, { Component } from 'react';
import "../../stylesheets/navigation_bar.scss";

class NavigationBar extends Component {
	componentDidMount() {
		document.getElementById('name-container').addEventListener("click", function() {
			window.location = "/";
		});

		document.getElementById('signing-up').addEventListener("click", function() {
			window.location = "/signup";
		});
	}
	loggedin() {
		return (
			<div id="login-signup">
				<p id="signing-up">Sign up</p>
				<p><a href="/login" id="signin_link">Sign in</a></p>
			</div>
		)
	}
	render() {
		return (
			<div id="nav">
				<div id="name-container">
					<div id="idea-icon"></div>
					<p id="title1">Conceptual</p>
					<p id="title2">Ideas</p>
					<p id="title3">Node.js</p>
				</div>

				{this.loggedin()}
			</div>
		)
	}
}

export default NavigationBar;
