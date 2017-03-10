
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//components
import ViewIndex from './views/ViewIndex';
import ViewInternal from './views/ViewInternal';


//utilities
import HOCView from './HOCView';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    //select from a list of components
    this.components = {
      ViewIndex,
      ViewInternal
    }

  }

  render() {
    //assign the component we want to use
    //ReactCSSTransitionGroup needs key even if just one item
    const SpecificComponent = this.components[this.props.route.componentType];
    return (
        <div id="main-wrapper" >
          <div ref="mainFrame" style={{height: this.props.height}} className="main-frame">
            <div className="inner-frame">
              <div className="row">
                <div className="medium-12 columns center">

                  <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    <SpecificComponent key={1} {...this.props} />
                  </ReactCSSTransitionGroup>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

let compData = {

};

export default HOCView(View, compData);