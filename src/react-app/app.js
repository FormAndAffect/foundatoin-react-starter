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
import Home from './components/home';
import Page from './components/page';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

//asyncronous component
// const my_component = asyncComponent(() => 
//   System.import('./components/my_component').then(module => module.default)
// )

//notes:
// - the "exact path="/"" in routes that don't have a query parameter
// - Main can't be a redux component since it wraps the rect-router Switch. 
// if it is then child compoonents won't update on change route
//- path="/:id"  accessed by: props.match.params.id
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
      <Main>
       <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Page} />
       </Switch>
      </Main>
      </div>  
    </BrowserRouter>
  </Provider>
  , document.querySelector('.app-container'));
