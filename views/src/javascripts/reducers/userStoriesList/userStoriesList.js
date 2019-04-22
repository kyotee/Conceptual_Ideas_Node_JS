import C from '../../actions/userStoriesListTypes.js';

const initalState = {
  storyCount: 0,
  stories: [],
  isProduction: true,
  editStates: []
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
  case C.ADD_STORY:
    let highestIndex = 0;

    for (let index = 0; index < state.stories.length; index++) {
      if (state.stories[index].stories_id > highestIndex)
        highestIndex = state.stories[index].stories_id;
    }

    // clearDB (MySQL) used in production auto increments by 10
    state.isProduction === true ? highestIndex += 10 : highestIndex += 1;

    const newStory = {
            stories_id: highestIndex,
            users_id: action.user_id,
            title: 'Title Text',
            given_case: 'Given text',
            when_case: 'When text',
            then_case: 'Then text'
          };

    return { ...state, stories: state.stories.concat(newStory), editStates: state.editStates.push(false)};
  case C.EDIT_STORY:
  
  case C.SET_EDIT_STATE:
    let editingStates = [];

    for (let index = 0; index < action.storyCount; index++) {
      editingStates.push(false);
    }

    return { ...state, editStates: editingStates };
  case C.UPDATE_EDIT_STATE:
    let updatingStates = state.editStates;

    for (let index = 0; index < updatingStates.length; index++) {
      if (state.stories[index].stories_id == action.stories_id) {
        if (updatingStates[index] == true)
          updatingStates[index] = false;
        else
          updatingStates[index] = true;
      }
    }

    return { ...state, editStates: updatingStates };
  case C.DELETE_STORY:    
    let removingStates = state.editStates;

    for (let index = 0; index < removingStates.length; index++) {
      if (state.stories[index].stories_id == action.stories_id)
        removingStates.splice(index, 1);
    }

    return { ...state, stories: state.stories.filter(function(x){ return x.stories_id != action.stories_id; }), editStates: removingStates};
  case C.ENVIRONMENT:
    return { ...state, isProduction: action.isProduction };
  default:
    return state;
  }
}
