import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserStories from '../ui/user_stories.js';
import * as UserStoriesActions from '../actions/userStories';

function mapStateToProps(state, ownProps) {
  return {
    edit: state.userStories.edit,
    position: ownProps.position,
    stories_id: ownProps.stories_id,
    users_id: ownProps.users_id,
    title: ownProps.title,
    given_case: ownProps.given_case,
    when_case: ownProps.when_case,
    then_case: ownProps.then_case
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserStoriesActions, dispatch);
}

const UserStoriesContainer = connect(mapStateToProps, mapDispatchToProps)(UserStories);

export default UserStoriesContainer;
