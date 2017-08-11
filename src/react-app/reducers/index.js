import { combineReducers } from 'redux';
import reducerNav from './reducerNav';
import reducerCurrentPages from './reducerCurrentPages';
import reducerNavDirection from './reducerNavDirection';
import reducerNavDisabled from './reducerNavDisabled';
import reducerScrollPages from './reducerScrollPages';
import reducerIsTransitioning from './reducerIsTransitioning';


const rootReducer = combineReducers({
  nav: reducerNav,
  currentPages: reducerCurrentPages,
  navDirection: reducerNavDirection,
  navDisabled: reducerNavDisabled,
  scrollPages: reducerScrollPages,
  isTransitioning: reducerIsTransitioning
});

export default rootReducer;