import { combineReducers } from 'redux';
import counter from './counter/counter';
import userStories from './userStories/userStories';
import userStoriesList from './userStoriesList/userStoriesList';
import signupSigninForm from './signupSigninForm/signupSigninForm';

const rootReducer = combineReducers({
	counter,
	userStories,
	userStoriesList,
	signupSigninForm
});

export default rootReducer;
