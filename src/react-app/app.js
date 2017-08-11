import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// the browserHistory object specifies what part of the url react-router cares about
// this is different than the History module import that comes along with 
// react-router when it's installed
// browserHistory cares about everything after the / in the url (posts/5):
// www.blog.com/posts/5
// we could use hashHistory for example would care about this:
// www.blog.com/#posts/5
import { Router, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';


//using redux dev tools (chrome plugin version)
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware()
  // other store enhancers if any
));

//without middleware
//const createStoreWithMiddleware = applyMiddleware()(createStore);
//<Provider store={createStoreWithMiddleware(reducers)}>

//if using reduxThunk...
// import reduxThunk from 'redux-thunk';
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//<Provider store={createStoreWithMiddleware(reducers)}>

//export store for use with redux-watch
export { store };

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  , document.querySelector('.app'));
