import C from './userStoriesListTypes.js';

export function findEnvironment(isProduction) {
  return {
    type: C.ENVIRONMENT,
    isProduction: isProduction
  };
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

export function deleteStory(story_id, user_id) {
  return {
    type: C.DELETE_STORY,
    story_id: story_id,
    user_id: user_id
  };
}
