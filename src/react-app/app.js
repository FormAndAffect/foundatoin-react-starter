/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
import $ from 'jquery';
import whatInput from 'what-input';
window.$ = $;
// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, 
// comment out the above and uncomment the line below
import './lib/foundation-explicit-pieces';
$(document).foundation(); 


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import customHistory from './history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import asyncComponent from './lib/async_component';

import Main from './components/main';
import Page from './components/page';
import reducers from './reducers';
import { PrefixerProvider, withPrefixer } from 'react-prefixer-provider';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

//asyncronous component
// const my_component = asyncComponent(() => 
//   System.import('./components/my_component').then(module => module.default)
// )

// This prefixes everything with the webkit prefix. 
const myPrefixer = (styles) => {
  const prefixed = {}
  for (let key in styles) {
    prefixed["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key]
  }
  return prefixed
}

//Header needs to be a pathless Route so it updates when 
//the route changes and use props.history
//<Route history={customHistory} component={Header} />

//note the "exact" in routes that don't have a query parameter

//path="/:id"  accessed by: props.match.params.id
ReactDOM.render(
  <PrefixerProvider prefixer={myPrefixer}>
  <Provider store={store}>
    <BrowserRouter history={customHistory}>
      <div>
       <Switch history={customHistory}>
          {/* website */}
          <Route history={customHistory} exact path="/" component={withPrefixer(Main)} />
          <Route history={customHistory} path="/:id" component={Page} />
        </Switch> 
      </div>  
    </BrowserRouter>
  </Provider>
  </PrefixerProvider>
  , document.querySelector('.app-container'));

//export store for use with redux-watch
export { store };
