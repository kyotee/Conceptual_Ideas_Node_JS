import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserStories from '../ui/user_stories.js';
import * as UserStoriesActions from '../actions/userStories';

function mapStateToProps(state, ownProps) {
  return {
    edit: state.userStories.edit,
    position: ownProps.position
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserStoriesActions, dispatch);
}

const UserStoriesContainer = connect(mapStateToProps, mapDispatchToProps)(UserStories);

export default UserStoriesContainer;
