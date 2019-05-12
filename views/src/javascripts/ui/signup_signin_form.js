import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import ActionButton from './_action_button.js';
import { sanitization } from '../helpers/input_sanitization.js';
import { eventListenerMacro } from '../helpers/event_listeners.js';
import "../../stylesheets/session.scss";

class SignupSigninForm extends Component {
	constructor(props) {
		super(props);

		this.isComplete = this.isComplete.bind(this); 
		this.submission = this.submission.bind(this);
		this.submissionEnter = this.submissionEnter.bind(this);
		this.nameColor = this.nameColor.bind(this);
		this.emailColor = this.emailColor.bind(this);
		this.passwordColor = this.passwordColor.bind(this);
		this.verifyPasswordColor = this.verifyPasswordColor.bind(this);
	}
	isComplete(formType) {
		if (formType === 'Sign up') {
			if (this.props.nameCurrentColor !== 'Green' || 
				this.props.emailCurrentColor !== 'Green' || 
				this.props.passCurrentColor !== 'Green' || 
				this.props.vPassCurrentColor !== 'Green') 
				return false;
			else
				return true;
		} else {
			if (this.props.emailCurrentColor !== 'Green' || 
				this.props.passCurrentColor !== 'Green') 
				return false;
			else return true;			
		}
	}
	nameColor(e) {
		let name = e.target.value;
		let nameLength = name.length;
		let reg = /^[a-zA-Z]+$/;

		if (this.props.nameCurrentColor === 'Grey')
			this.props.changeNameColor('Blue');

		if (nameLength > 0 && nameLength <= 12 && reg.test(String(name)))
			this.props.changeNameColor('Green');
		else
			this.props.changeNameColor('Blue');

		this.props.setName(name);
	}
	emailColor(e) {
		let email = e.target.value;
		let emailLength = email.length; 
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (this.props.emailCurrentColor === 'Grey')
			this.props.changeEmailColor('Blue');

		if (this.props.formType === 'Sign up') {
	 		if (re.test(String(email)) && emailLength > 0 && emailLength < 40)
				this.props.changeEmailColor('Green');
			else
				this.props.changeEmailColor('Blue');
		} else {
			if (emailLength > 0)
				this.props.changeEmailColor('Green');
			else
				this.props.changeEmailColor('Blue');
		}

		this.props.setEmail(email);
	}
	passwordColor(e) {
		let password = e.target.value;
		let passwordLength = password.length;
		let verifyPassword = this.props.verifyPassword;

		if (this.props.passCurrentColor === 'Grey')
			this.props.changePassColor('Blue');

		if (this.props.formType === 'Sign up') {
			if (passwordLength >= 6 && passwordLength <= 12)
				this.props.changePassColor('Green');
			else
				this.props.changePassColor('Blue');

			if (this.props.vPassCurrentColor !== 'Grey') {
				if (password == verifyPassword && password != "" && verifyPassword != "")
					this.props.changeVpassColor('Green');
				else
					this.props.changeVpassColor('Blue');
			}
		} else {
			if (passwordLength > 0)
				this.props.changePassColor('Green');
			else
				this.props.changePassColor('Blue');		
		}

		this.props.setPassword(password);
	}
	verifyPasswordColor(e) {
		let password = this.props.password;
		let verifyPassword = e.target.value;

		if (this.props.vPassCurrentColor === 'Grey')
			this.props.changeVpassColor('Blue');

		if (password == verifyPassword && password != "" && verifyPassword != "") 
			this.props.changeVpassColor('Green');
		else
			this.props.changeVpassColor('Blue');

		this.props.setVerifyPassword(verifyPassword);
	}
	submission() {
		if (!this.isComplete(this.props.formType))
			return;

		if (this.props.formType === 'Sign up') {
			let userCredentials = {
				user: {
					  name: sanitization(this.props.name),
					  email: sanitization(this.props.email),
					  password: sanitization(this.props.password),
					  password_confirmation: sanitization(this.props.verifyPassword)
				}
			};

			// $.ajax({
			// 	type: "POST",
			// 	url: "/signup",
			// 	data: userCredentials,
			// 	success: function(data, textStatus, jqXHR) {
			// 		console.log("User creation; submission successful.");
			// 	},
			// 	error: function(jqXHR, textStatus, errorThrown) {
			// 		console.log("User creation; submission unsuccessful.");
			// 	}
			// });
		}
		else {
			let userCredentials = {
				userLogin: {
					  email: sanitization(this.props.email),
					  password: sanitization(this.props.password)
				}
			};

			// $.ajax({
			// 	type: "POST",
			// 	url: "/login",
			// 	data: userCredentials,
			// 	success: function(data, textStatus, jqXHR) {
			// 		console.log("User login; submission successful.");
			// 	},
			// 	error: function(jqXHR, textStatus, errorThrown) {
			// 		console.log("User login; submission unsuccessful.");
			// 	}
			// });
		}

		this.props.eraseCredentials();
	}
	submissionEnter(e) {
		if (e.key === 'Enter')
			this.submission();
	}
	inputColoring(color,element) {
		let styling;

		if (color === 'Blue') {
			if (element === 'Text') {
				styling = {
					color: "#0080ff"
				};
			} else if (element === 'Border') {
				styling = {
					borderColor: "#00aced"
				};
			} else if (element === 'Display') {
				styling = {
					display: "inline"
				};
			}
		} else if (color === 'Green') {
			if (element === 'Text') {
				styling = {
					color: "#00ba9b"
				};
			} else if (element === 'Border') {
				styling = {
					borderColor: "#00ba9b"
				};
			} else if (element === 'Display') {
				styling = {
					display: "none"
				};
			}
		}

		return styling;
	}
	render() {
		const { formType,nameCurrentColor,emailCurrentColor,passCurrentColor,vPassCurrentColor } = this.props;

		if (formType === 'Sign up') {
			return (
				<div id="signup-table-rails">
					<table id="signup-table">
						<tbody>
							<tr>
								<th><div className="idea-icon-form"></div><h2 className="form-title">{this.props.formType}</h2></th>
							</tr>
							<tr>
								<th><p className="verify-name" style={this.inputColoring(nameCurrentColor,'Text')}>User Name</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-name-input" style={this.inputColoring(nameCurrentColor,'Border')} value={this.props.name} onKeyPress={this.submissionEnter} onChange={this.nameColor} onClick={this.nameColor} onFocus={this.nameColor} type="text" name="name"></input><br/>
									<p className="verify-name" style={this.inputColoring(nameCurrentColor,'Display')}>between 1 to 12 letters</p>
								</td>
							</tr>
							<tr>
								<th><p className="verify-email" style={this.inputColoring(emailCurrentColor,'Text')}>E-mail</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-email-input" style={this.inputColoring(emailCurrentColor,'Border')} value={this.props.email} onKeyPress={this.submissionEnter} onChange={this.emailColor} onClick={this.emailColor} onFocus={this.emailColor} type="text" name="email"></input><br/>
									<p className="verify-email" style={this.inputColoring(emailCurrentColor,'Display')}>valid e-mail under 40 characters</p>
								</td>
							</tr>
							<tr>
								<th><p className="verify-password" style={this.inputColoring(passCurrentColor,'Text')}>Password</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-password-input" style={this.inputColoring(passCurrentColor,'Border')} value={this.props.password} onKeyPress={this.submissionEnter} onChange={this.passwordColor} onClick={this.passwordColor} onFocus={this.passwordColor} type="password" name="password"></input><br/>
									<p className="verify-password" style={this.inputColoring(passCurrentColor,'Display')}>between 6 to 12 characters</p>
								</td>
							</tr>
							<tr>
								<th><p className="verify-password-confirm" style={this.inputColoring(vPassCurrentColor,'Text')}>Password Confirmation</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-password-confirm-input" style={this.inputColoring(vPassCurrentColor,'Border')} value={this.props.verifyPassword} onKeyPress={this.submissionEnter} onChange={this.verifyPasswordColor} onClick={this.verifyPasswordColor} onFocus={this.verifyPasswordColor} type="password" name="verify-password"></input><br/>
									<p className="verify-password-confirm" style={this.inputColoring(vPassCurrentColor,'Display')}>matches password</p>
								</td>
							</tr>
							<tr>
								<td><div id="accept-button" onClick={this.submission}><ActionButton text={this.props.formType} /></div></td>
							</tr>
						</tbody>
					</table>
				</div>
			)
		} else {
			return (
				<div id="signup-table-rails">
					<table id="signup-table">
						<tbody>
							<tr>
								<th><div className="idea-icon-form"></div><h2 className="form-title">{this.props.formType}</h2></th>
							</tr>
							<tr>
								<th><p className="verify-email" style={this.inputColoring(emailCurrentColor,'Text')}>E-mail</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-email-input" style={this.inputColoring(emailCurrentColor,'Border')} value={this.props.email} onKeyPress={this.submissionEnter} onChange={this.emailColor} onClick={this.emailColor} onFocus={this.emailColor} type="text" name="email"></input>
								</td>
							</tr>
							<tr>
								<th><p className="verify-password" style={this.inputColoring(passCurrentColor,'Text')}>Password</p></th>
							</tr>
							<tr>
								<td>
									<input id="verify-password-input" style={this.inputColoring(passCurrentColor,'Border')} value={this.props.password} onKeyPress={this.submissionEnter} onChange={this.passwordColor} onClick={this.passwordColor} onFocus={this.passwordColor} type="password" name="password"></input>
								</td>
							</tr>
							<tr>
								<td><div id="accept-button" onClick={this.submission}><ActionButton text={this.props.formType} /></div></td>
							</tr>
							<p id="signup-now">No account? <a href="/signup">Sign up now!</a></p>
						</tbody>
					</table>
				</div>
			)
		}
	}
}

SignupSigninForm.propTypes = {
	formType: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	verifyPassword: PropTypes.string.isRequired,
	nameCurrentColor: PropTypes.string.isRequired,
	emailCurrentColor: PropTypes.string.isRequired,
	passCurrentColor: PropTypes.string.isRequired,
	vPassCurrentColor: PropTypes.string.isRequired,
	changeNameColor: PropTypes.func.isRequired,
	changeEmailColor: PropTypes.func.isRequired,
	changePassColor: PropTypes.func.isRequired,
	changeVpassColor: PropTypes.func.isRequired,
	setName: PropTypes.func.isRequired,
	setEmail: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	setVerifyPassword: PropTypes.func.isRequired,
	eraseCredentials: PropTypes.func.isRequired
};

export default SignupSigninForm;
