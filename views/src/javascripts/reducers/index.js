import { combineReducers } from 'redux';
import counter from './counter/counter';
import userStories from './userStories/userStories';

const rootReducer = combineReducers({
	counter,
	userStories
});

export default rootReducer;
