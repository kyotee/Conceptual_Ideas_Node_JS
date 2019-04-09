import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../../stylesheets/user_applications.scss";

class ActionButton extends Component {
	componentDidMount() {
		let detectButton = document.getElementsByClassName('img-button')[0];

		detectButton.addEventListener('mouseover', function() {
			detectButton.style.transition = "transform .0.5s";
			detectButton.style.transform = "scale(1.1)";
		});

		detectButton.addEventListener('mouseout', function() {
			detectButton.style.transition = "transform .0.5s";
			detectButton.style.transform = "scale(1)";
		});
	}
	render() {
		return (
			<button className="img-button">{this.props.text}</button>
		)
	}
}

ActionButton.propTypes = {
	text: PropTypes.string.isRequired
};

export default ActionButton;
