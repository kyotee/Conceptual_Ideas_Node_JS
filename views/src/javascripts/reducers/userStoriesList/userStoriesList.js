import C from '../../actions/userStoriesListTypes.js';

const initalState = {
  storyCount: 0,
  stories: []
};

export default function userStoriesList(state = initalState, action) {
  switch (action.type) {
  case C.SET_STORIES_COUNT:
    return { ...state, storyCount: action.storyCount };
  case C.ADD_STORIES_COUNT:
	return { ...state, storyCount: action.storyCount };
  case C.DELETE_STORIES_COUNT:
	return { ...state, storyCount: action.storyCount };
  case C.SET_STORIES:
    return { ...state, stories: action.stories };
  default:
    return state;
  }
}
