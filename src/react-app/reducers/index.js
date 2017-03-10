import { combineReducers } from 'redux';
import reducerSample from './reducerSample';
import reducerNav from './reducerNav';


const rootReducer = combineReducers({
  sample: reducerSample,
  nav: reducerNav,
});

export default rootReducer;