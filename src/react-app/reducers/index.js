import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reducerIsOnline from './reducerIsOnline';

const rootReducer = combineReducers({
  form,
  isOnline: reducerIsOnline,
});

export default rootReducer;
