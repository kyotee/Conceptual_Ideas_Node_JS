import { combineReducers } from 'redux';
import counter from './counter/counter';
import userStories from './userStories/userStories';
import userStoriesList from './userStoriesList/userStoriesList';

const rootReducer = combineReducers({
	counter,
	userStories,
	userStoriesList
});

export default rootReducer;
