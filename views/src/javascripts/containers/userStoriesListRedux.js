import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserStoriesListContainer from './userStoriesListContainer';
import configureStore from '../store/configureStore';
import {setStoryCount,setStories} from '../actions/userStoriesList';

const store = configureStore();

class UserStoriesListRedux extends Component {
  state = { count: null }

  componentWillMount() {
    this.getUserStories();
  }
  getUserStories = () => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(json => { 
                      store.dispatch(setStories(json));
                      store.dispatch(setStoryCount(json.length));
                      this.setState({ count: json.length });       
                    })
      .catch(err => err);
  }
  render() {
        if (this.state.count === null) {
        return null;
    }

    return (
      <Provider store={store}>
        <UserStoriesListContainer />
      </Provider>
    );
  }
}

export default UserStoriesListRedux;
