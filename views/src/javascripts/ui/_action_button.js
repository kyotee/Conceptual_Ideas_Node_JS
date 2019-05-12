import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../../stylesheets/user_applications.scss";

class ActionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {	
			enlarged: false
		};

		this.buttonEnlarger = this.buttonEnlarger.bind(this);
		this.buttonNormal = this.buttonNormal.bind(this);
	}
	buttonEnlarger() {
		this.setState({ enlarged: true });
	}
	buttonNormal() {
		this.setState({ enlarged: false });
	}
	render() {
		const { enlarged } = this.state;
		const { text } = this.props;
	    let buttonMovement;

	    if (enlarged) {
	    	buttonMovement = { 
	      		transition: "transform .0.5s",
	      		transform: "scale(1.1)"
	      	}
	    }

		return (
			<button className="img-button" style={buttonMovement} onMouseOver={this.buttonEnlarger} onMouseOut={this.buttonNormal}>{text}</button>
		)
	}
}

ActionButton.propTypes = {
	text: PropTypes.string.isRequired
};

export default ActionButton;
