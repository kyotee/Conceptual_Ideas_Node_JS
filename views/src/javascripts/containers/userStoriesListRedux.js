import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserStoriesListContainer from './userStoriesListContainer';
import configureStore from '../store/configureStore';
import {setStoryCount} from '../actions/userStoriesList';

const store = configureStore();

class UserStoriesListRedux extends Component {
  componentWillMount() {
    store.dispatch(setStoryCount(3));
  }
  render() {
    return (
      <Provider store={store}>
        <UserStoriesListContainer />
      </Provider>
    );
  }
}

export default UserStoriesListRedux;
