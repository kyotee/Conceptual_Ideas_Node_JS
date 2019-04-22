import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserStoriesListContainer from './userStoriesListContainer';
import configureStore from '../store/configureStore';
import {findEnvironment,setStoryCount,setStories,setEditState} from '../actions/userStoriesList';

const store = configureStore();

class UserStoriesListRedux extends Component {
  state = {  count: null,
             isProduction: null
          }

  componentWillMount() {
    this.getUserStories();
  }
  getUserStories = () => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(json => {
                      store.dispatch(setStories(json));
                      store.dispatch(setStoryCount(json.length));
                      store.dispatch(setEditState(json.length));
                      this.setState({ count: json.length });       
                    })
      .catch(err => err);
    fetch('/api/environment')
      .then(res => res.json())
      .then(json => {
                      store.dispatch(findEnvironment(json));
                      this.setState({ isProduction: json });   
                    })
      .catch(err => err);
  }
  render() {
        if (this.state.count === null || this.state.isProduction === null) {
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
