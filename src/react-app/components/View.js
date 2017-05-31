
import React, { Component } from 'react';

//components
// import ViewIndex from './views/ViewIndex';
import ViewInternal from './views/ViewInternal';


//utilities
import HOCView from './HOCView';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    //select from a list of components
    this.components = {
      //ViewIndex,
      ViewInternal
    }

  }

  render() {
    //assign the component we want to use
    //ReactCSSTransitionGroup needs key even if just one item
    const SpecificComponent = this.components[this.props.route.componentType];
    return (
        <div className="component-wrapper" >
              <SpecificComponent key={1} {...this.props} />
        </div>
      )
  }

}

let compData = {

};

export default HOCView(View, compData);