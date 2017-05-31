import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    //we must put {this.props.children} here so that routes.js will go ahead and render 
    //any children it has in routes.js
    //ofcourse, within that, only children that match the current route will end up being rendered
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}