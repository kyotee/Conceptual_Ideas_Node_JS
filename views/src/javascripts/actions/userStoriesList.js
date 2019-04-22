import C from './userStoriesListTypes.js';

export function findEnvironment(isProduction) {
  return {
    type: C.ENVIRONMENT,
    isProduction: isProduction
  };
}

export function databaseIncrementer(databaseOffset) {
  return {
    type: C.DATABASE_INCREMENT,
    databaseOffset: databaseOffset
  }
}

export function setStoryCount(storyCount) {
  return {
    type: C.SET_STORIES_COUNT,
    storyCount: storyCount
  };
}

export function addStoryCount(storyCount) {
  return {
    type: C.ADD_STORIES_COUNT,
    storyCount: storyCount
  };
}

export function deleteStoryCount(storyCount) {
  return {
    type: C.DELETE_STORIES_COUNT,
    storyCount: storyCount
  };
}

export function setStories(stories) {
  return {
    type: C.SET_STORIES,
    stories: stories
  };
}

export function addStory(user_id) {
  return {
    type: C.ADD_STORY,
    user_id: user_id
  };
}

export function editStory(stories_id,given_case,when_case,then_case) {
  return {
    type: C.EDIT_STORY,
    stories_id: stories_id,
    given_case: given_case,
    when_case: when_case,
    then_case: then_case
  };
}

export function setEditState(storyCount) {
  return {
    type: C.SET_EDIT_STATE,
    storyCount: storyCount
  };
}

export function updateEditState(stories_id) {
  return {
    type: C.UPDATE_EDIT_STATE,
    stories_id: stories_id
  };
}

export function deleteStory(stories_id) {
  return {
    type: C.DELETE_STORY,
    stories_id: stories_id
  };
}
