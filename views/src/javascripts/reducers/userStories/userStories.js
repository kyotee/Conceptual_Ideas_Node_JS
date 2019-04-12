import C from '../../actions/userStoriesTypes.js';

const initalState = {
  edit: false
};

export default function userStories(state = initalState, action) {
  switch (action.type) {
  case C.CHANGE_EDIT:
    return { ...state, edit: action.edit };
  default:
    return state;
  }
}
