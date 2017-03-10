
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//components
import Nav from '../Nav';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

//utilities
import HOCViewInternal from './HOCViewInternal';

class ViewInternal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    console.log(this.props.nav[0].id);
  }

  //get the page from the router url query called from previouse page button click
  render() {

    return (
              <div>
                ViewInternal2: {this.props.params.pageName}
                <br/>
                <Nav navItems={this.props.nav} />
                <ReactCSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>

                  {this.props.nav[0].isSet  &&
                    <Page1 key={1} />
                  }

                  {this.props.nav[1].isSet  &&
                    <Page2 key={2} />
                  }

                </ReactCSSTransitionGroup>
              </div>
          )
  }

}

let compData = {

};

export default HOCViewInternal(ViewInternal);