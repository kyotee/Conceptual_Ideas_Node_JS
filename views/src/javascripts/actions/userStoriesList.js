import C from './userStoriesListTypes.js';

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
