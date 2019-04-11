import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import { sanitization } from '../helpers/input_sanitization.js';
import { eventListenerMacro } from '../helpers/event_listeners.js';
import "../../stylesheets/session.scss";

class SignupSigninForm extends Component {
	constructor(props) {
		super(props);

		this.buttonValidChecker = this.buttonValidChecker.bind(this);
	}
	buttonValidChecker() {
		const passColor = "rgb(50, 205, 50)";

		if(this.props.formType === "Sign up") {
			var nameCheck = document.getElementsByClassName('verify-name')[0].style.color == passColor;
			var passVerCheck = document.getElementsByClassName('verify-password-confirm')[0].style.color == passColor;
		}

		let emailCheck = document.getElementsByClassName('verify-email')[0].style.color == passColor;
		let passCheck = document.getElementsByClassName('verify-password')[0].style.color == passColor;
		let buttonColor = document.getElementById('accept-button');

		if ((nameCheck && emailCheck && passCheck && passVerCheck) || (this.props.formType === "Sign in" && emailCheck && passCheck)) {
			buttonColor.style.color = "#FFFFFF";
			buttonColor.style.backgroundColor = "#32CD32";

			buttonColor.addEventListener('mouseover', function() {
				buttonColor.style.transition = "transform .0.5s";
				buttonColor.style.transform = "scale(1.1)";
			});

			buttonColor.addEventListener('mouseout', function() {
				buttonColor.style.transition = "transform .0.5s";
				buttonColor.style.transform = "scale(1)";
			});
		} else {
			buttonColor.style.color = "#68838B";
			buttonColor.style.backgroundColor = "#D3D3D3";

			eventListenerMacro('accept-button', 'mouseover mouseout', function() {
				buttonColor.style.transition = "";
				buttonColor.style.transform = "";
			});
		}
	}
	colorChanger(id1, id2, id3, color) {
		if (color === "Blue") {
			id1.style.borderColor = "#00aced";
			id2.style.color = "#0080ff";
			id3.style.display = "inline";
		} else {
			id1.style.borderColor = "#32CD32";
			id2.style.color = "#32CD32";
			id3.style.display = "none";
		}

	}
	componentDidMount() {
		if(this.props.formType === "Sign up") {
			eventListenerMacro('verify-name-input', 'click keyup paste', function() {
				let verifyNameInput = document.getElementById('verify-name-input');
				let verifyNameColor = document.getElementsByClassName('verify-name')[0];
				let verifyNameDisplay = document.getElementsByClassName('verify-name')[1];

				this.colorChanger(verifyNameInput, verifyNameColor, verifyNameDisplay, "Blue");

				let name = verifyNameInput.value;
				let nameLength = verifyNameInput.value.length;
				let reg = /^[a-zA-Z]+$/;

				if (nameLength > 0 && nameLength <= 12 && reg.test(String(name)))
					this.colorChanger(verifyNameInput, verifyNameColor, verifyNameDisplay, "Green");

				this.buttonValidChecker();
			}.bind(this));
		}

		eventListenerMacro('verify-email-input', 'click keyup paste', function() {
			let verifyEmailInput = document.getElementById('verify-email-input');
			let verifyEmailColor = document.getElementsByClassName('verify-email')[0];
			let verifyEmailDisplay = document.getElementsByClassName('verify-email')[1];

			if(this.props.formType === "Sign up") {
				this.colorChanger(verifyEmailInput, verifyEmailColor, verifyEmailDisplay, "Blue");

				let emailValue = verifyEmailInput.value;
				let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    	
	    		if (re.test(String(emailValue)) && emailValue.length > 0 && emailValue.length < 40)
					this.colorChanger(verifyEmailInput, verifyEmailColor, verifyEmailDisplay, "Green");

    			this.buttonValidChecker();
	    	} else {
	    		if (verifyEmailInput.value.length > 0) {
	    			verifyEmailColor.style.color = "#32CD32";
	    			verifyEmailInput.style.borderColor = "#32CD32";
	    		}
	    		else {
	    			verifyEmailColor.style.color = "#0080ff";
	    			verifyEmailInput.style.borderColor = "#00aced";
	    		}

	    		this.buttonValidChecker();
	    	}
		}.bind(this));

		eventListenerMacro('verify-password-input', 'click keyup paste', function() {
			let verifyPasswordInput = document.getElementById('verify-password-input');
			let verifyPasswordColor = document.getElementsByClassName('verify-password')[0];
			let verifyPasswordDisplay = document.getElementsByClassName('verify-password')[1];

			if(this.props.formType === "Sign up") {
				this.colorChanger(verifyPasswordInput, verifyPasswordColor, verifyPasswordDisplay, "Blue");

				let passwordLength = verifyPasswordInput.value.length;

				// case were new password field != password confirm password
				if (verifyPasswordInput.value != document.getElementById('verify-password-confirm-input').value
					&& document.getElementsByClassName('verify-password-confirm')[0].style.color === "rgb(50, 205, 50)") {
					document.getElementsByClassName('verify-password-confirm')[0].style.color = "#0080ff";
					document.getElementById('verify-password-confirm-input').style.borderColor = "#00aced";
				}

				// case where new password field == password confirm password
				if (verifyPasswordInput.value === document.getElementById('verify-password-confirm-input').value 
					&& verifyPasswordInput.value !== "") {
					document.getElementById('verify-password-confirm-input').style.borderColor = "#32CD32";
					document.getElementsByClassName('verify-password-confirm')[0].style.color = "#32CD32";
					document.getElementsByClassName('verify-password-confirm')[1].style.display = "none";
				}

				if(passwordLength >= 6 && passwordLength <= 12)
					this.colorChanger(verifyPasswordInput, verifyPasswordColor, verifyPasswordDisplay, "Green");

				this.buttonValidChecker();
			} else {
	    		if (verifyPasswordInput.value.length > 0) {
	    			verifyPasswordColor.style.color = "#32CD32";
	    			verifyPasswordInput.style.borderColor = "#32CD32";
	    		}
	    		else {
	    			verifyPasswordColor.style.color = "#0080ff";
	    			verifyPasswordInput.style.borderColor = "#00aced";
	    		}

	    		this.buttonValidChecker();	
			}
		}.bind(this));

		if(this.props.formType === "Sign up") {
			eventListenerMacro('verify-password-confirm-input', 'click keyup paste', function() {
				let verifyPasswordConfInput = document.getElementById('verify-password-confirm-input');
				let verifyPasswordConfColor = document.getElementsByClassName('verify-password-confirm')[0];
				let verifyPasswordConfDisplay = document.getElementsByClassName('verify-password-confirm')[1];

				this.colorChanger(verifyPasswordConfInput, verifyPasswordConfColor, verifyPasswordConfDisplay, "Blue");

				let passwordVerValue = verifyPasswordConfInput.value;

				// case where new confirm password field == password field
				if (document.getElementById('verify-password-input').value === passwordVerValue && passwordVerValue !== "")
					this.colorChanger(verifyPasswordConfInput, verifyPasswordConfColor, verifyPasswordConfDisplay, "Green");

				this.buttonValidChecker();
			}.bind(this));
		}

		var submission = function() {
			if (this.props.formType === "Sign up") {
				let userCredentials = {
					user: {
						  name: sanitization(document.getElementById('verify-name-input').value),
						  email: sanitization(document.getElementById('verify-email-input').value),
						  password: sanitization(document.getElementById('verify-password-input').value),
						  password_confirmation: sanitization(document.getElementById('verify-password-confirm-input').value)
					}
				};

				if (userCredentials.user.name === "" || 
					userCredentials.user.email === "" || 
					userCredentials.user.password === "" || 
					userCredentials.user.password_confirmation === "") 
					return;

				axios({
					method: "post",
					url: "/signup",
					data: userCredentials
				})
				.then(function (response) {
					console.log("User creation; submission successful.");
				})
				.catch(function (error) {
					console.log("User creation; submission unsuccessful.");
				});
			}
			else {
				let userCredentials = {
					userLogin: {
						  email: sanitization(document.getElementById('verify-email-input').value),
						  password: sanitization(document.getElementById('verify-password-input').value)
					}
				};

				if (userCredentials.userLogin.email === "" || userCredentials.userLogin.password === "")
					return;

				axios({
					method: "post",
					url: "/login",
					data: userCredentials
				})
				.then(function (response) {
					console.log("User login; submission successful.");
				})
				.catch(function (error) {
					console.log("User login; submission unsuccessful.");
				});
			}
		}.bind(this);

		// deal with enter key submission
		const sharedSubmission = (e) => {
			var key = e.which || e.keyCode;

			if (e.keyCode === 13)
				submission();
		};

		if (this.props.formType === "Sign up") {
			eventListenerMacro('verify-name-input verify-password-confirm-input', 'keypress', function(e) {
				sharedSubmission(e);
			});
		}

		eventListenerMacro('verify-email-input verify-password-input', 'keypress', function(e) {
			sharedSubmission(e);
		});

		document.getElementById('accept-button').addEventListener('click', submission);
	}
	signUpForm() {
		return (
			<div id="signup-table-rails">
				<table id="signup-table">
					<tbody>
						<tr>
							<th><div className="idea-icon-form"></div><h2 className="form-title">{this.props.formType}</h2></th>
						</tr>
						<tr>
							<th><p className="verify-name">User Name</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-name-input" type="text" name="name"></input><br/>
								<p className="verify-name">between 1 to 12 letters</p>
							</td>
						</tr>
						<tr>
							<th><p className="verify-email">E-mail</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-email-input" type="text" name="email"></input><br/>
								<p className="verify-email">valid e-mail under 40 characters</p>
							</td>
						</tr>
						<tr>
							<th><p className="verify-password">Password</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-password-input" type="password" name="password"></input><br/>
								<p className="verify-password">between 6 to 12 characters</p>
							</td>
						</tr>
						<tr>
							<th><p className="verify-password-confirm">Password Confirmation</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-password-confirm-input" type="password" name="verify-password"></input><br/>
								<p className="verify-password-confirm">matches password</p>
							</td>
						</tr>
						<tr>
							<td><button id="accept-button">{this.props.formType}</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
	signInForm() {
		return (
			<div id="signup-table-rails">
				<table id="signup-table">
					<tbody>
						<tr>
							<th><div className="idea-icon-form"></div><h2 className="form-title">{this.props.formType}</h2></th>
						</tr>
						<tr>
							<th><p className="verify-email">E-mail</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-email-input" type="text" name="email"></input>
							</td>
						</tr>
						<tr>
							<th><p className="verify-password">Password</p></th>
						</tr>
						<tr>
							<td>
								<input id="verify-password-input" type="password" name="password"></input>
							</td>
						</tr>
						<tr>
							<td><button id="accept-button">{this.props.formType}</button></td>
						</tr>
						<p id="signup-now">No account? <a href="/signup">Sign up now!</a></p>
					</tbody>
				</table>
			</div>
		)
	}

	render() {
		if(this.props.formType === "Sign up")
			return this.signUpForm();
		else
			return this.signInForm();
	}
}

SignupSigninForm.propTypes = {
	formType: PropTypes.string.isRequired
};

export default SignupSigninForm;
