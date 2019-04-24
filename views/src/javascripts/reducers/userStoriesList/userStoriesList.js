import C from '../../actions/userStoriesListTypes.js';

const initalState = {
  storyCount: 0,
  stories: [],
  databaseOffset: 0,
  isProduction: true
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
    let nextHighestIndex = state.databaseOffset;
    
    const newStory = {
            stories_id: state.databaseOffset,
            users_id: action.user_id,
            title: 'Title Text',
            given_case: 'Given text',
            when_case: 'When text',
            then_case: 'Then text'
          };

    // clearDB (MySQL) used in production auto increments by 10
    state.isProduction === true ? nextHighestIndex += 10 : nextHighestIndex += 1;

    return { ...state, stories: state.stories.concat(newStory), databaseOffset: nextHighestIndex};
  case C.DELETE_STORY: 
    return { ...state, stories: state.stories.filter(function(x){ return x.stories_id != action.stories_id; })};
  case C.DATABASE_INCREMENT:
    return { ...state, databaseOffset: action.databaseOffset[0].AUTO_INCREMENT };
  case C.ENVIRONMENT:
    return { ...state, isProduction: action.isProduction };
  default:
    return state;
  }
}
