import React, { Component, PropTypes } from 'react';

//components
import Nav from '../Nav';

//utilities
import HOCViewInternal from './HOCViewInternal';

class ViewIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
              <div>
                ViewIndex
                <br/>
                <Nav navItems={this.props.nav} />
              </div>
          )
  }

}

let compData = {

};

export default HOCViewInternal(ViewIndex);