import { combineReducers } from 'redux';
import reducerNav from './reducerNav';
import reducerPath from './reducerPath';
import reducerMediaSize from './reducerMediaSize';
import reducerCurrentPages from './reducerCurrentPages';
import reducerNavDirection from './reducerNavDirection';
import reducerNavDisabled from './reducerNavDisabled';
import reducerScrollPages from './reducerScrollPages';
import reducerIsTransitioning from './reducerIsTransitioning';
import reducerEndPages from './reducerEndPages';
import reducerIsMobile from './reducerIsMobile';


const rootReducer = combineReducers({
  path: reducerPath,
  nav: reducerNav,
  mediaSize: reducerMediaSize,
  currentPages: reducerCurrentPages,
  navDirection: reducerNavDirection,
  navDisabled: reducerNavDisabled,
  scrollPages: reducerScrollPages,
  isTransitioning: reducerIsTransitioning,
  endPages: reducerEndPages,
  isMobile: reducerIsMobile,
});

export default rootReducer;