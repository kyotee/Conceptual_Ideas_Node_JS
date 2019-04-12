import C from './userStoriesTypes.js';

export function changeEdit(edit) {
  return {
    type: C.CHANGE_EDIT,
    edit: edit
  };
}
