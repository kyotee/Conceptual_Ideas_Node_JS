import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserStoriesListContainer from './userStoriesListContainer';
import configureStore from '../store/configureStore';
import {setStoryCount,setStories} from '../actions/userStoriesList';

const store = configureStore();

class UserStoriesListRedux extends Component {
  componentWillMount() {
    this.getUserStories();
  }
  getUserStories = () => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(json => { store.dispatch(setStories(json));
                      store.dispatch(setStoryCount(json.length));  
                      alert(json);            
                    })
      .catch(err => err);
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
