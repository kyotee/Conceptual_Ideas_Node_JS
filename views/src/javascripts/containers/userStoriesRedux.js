import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserStoriesContainer from './userStoriesContainer';
import configureStore from '../store/configureStore';

const store = configureStore();

class UserStoriesRedux extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Provider store={store}>
        <UserStoriesContainer position={this.props.position} />
      </Provider>
    );
  }
}

export default UserStoriesRedux;
