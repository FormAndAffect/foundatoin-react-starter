import { combineReducers } from 'redux';
import reducerNav from './reducerNav';
import reducerMediaSize from './reducerMediaSize';
import reducerCurrentPages from './reducerCurrentPages';
import reducerNavDirection from './reducerNavDirection';
import reducerNavDisabled from './reducerNavDisabled';
import reducerScrollPages from './reducerScrollPages';
import reducerIsTransitioning from './reducerIsTransitioning';
import reducerIsMobile from './reducerIsMobile';


const rootReducer = combineReducers({
  nav: reducerNav,
  mediaSize: reducerMediaSize,
  currentPages: reducerCurrentPages,
  navDirection: reducerNavDirection,
  navDisabled: reducerNavDisabled,
  scrollPages: reducerScrollPages,
  isTransitioning: reducerIsTransitioning,
  isMobile: reducerIsMobile,
});

export default rootReducer;