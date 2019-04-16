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
        <UserStoriesContainer position={this.props.position} 
							  stories_id={this.props.stories_id}
							  users_id={this.props.users_id}
							  title={this.props.title}
							  given_case={this.props.given_case}
							  when_case={this.props.when_case}
							  then_case={this.props.then_case}
        />
      </Provider>
    );
  }
}

export default UserStoriesRedux;
