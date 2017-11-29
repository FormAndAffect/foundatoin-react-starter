import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reducerTest from './reducerTest';

const rootReducer = combineReducers({
  form,
  test: reducerTest,
});

export default rootReducer;
