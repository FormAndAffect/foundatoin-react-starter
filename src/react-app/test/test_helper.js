import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import chaiJquery from 'chai-jquery';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

/* ==========================================================================
Set up testing environment to run like a browser in the command line
========================================================================== */
//create a fake dom using jsdom, put it into global object
const dom = new JSDOM('<!doctype html><html><body></body></html>');
//assign the window from jsdom
global.window = dom.window;
global.document = dom.window.document;
//initialize jquery to use our fake dom
const $ = jquery(global.window);

/* ==========================================================================
build 'renderComponent' helper that should render a given react class
========================================================================== */
function renderComponent(ComponentClass, props, state) {
	//render the component into the fake dom using TestUtils (doesn't return actual html yet)
  const componentInstance = TestUtils.renderIntoDocument(
    //create a mock redux store with component inside
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  //ReactDOM.findDOMNode gets the actual html, then return it as a jquery element
  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

/* ==========================================================================
helper for simulating events
========================================================================== */
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  //simulate event using TestUtils
  //this[0] is the html element (from jQuery)
  TestUtils.Simulate[eventName](this[0]);
}
//usecase: $('myInput').simulate('change', 'my input value');

/* ==========================================================================
setup chai-jquery and export functions
========================================================================== */
//setup ChaiJuery to use our version of jQuery with the fake dom
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };