import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserStoriesList from '../ui/user_stories_list.js';
import * as UserStoriesListActions from '../actions/userStoriesList';

function mapStateToProps(state) {
  return {
  	storyCount: state.userStoriesList.storyCount,
  	stories: state.userStoriesList.stories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserStoriesListActions, dispatch);
}

const UserStoriesListContainer = connect(mapStateToProps, mapDispatchToProps)(UserStoriesList);

export default UserStoriesListContainer;
