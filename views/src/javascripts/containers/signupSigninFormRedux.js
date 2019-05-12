import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SignupSigninFormContainer from './signupSigninFormContainer';
import configureStore from '../store/configureStore';

const store = configureStore();

class SignupSigninFormRedux extends Component {
  render() {
    return (
      <Provider store={store}>
        <SignupSigninFormContainer formType={this.props.formType} />
      </Provider>
    );
  }
}

export default SignupSigninFormRedux;
