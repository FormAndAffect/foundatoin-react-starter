import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Page1 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
    }
    
  }

  render() {
          return (
            <div>
              Page1
            </div>
            )
      }
}

function mapStateToProps(state) {
  return {
    //redux state
  }
}
      
export default connect(mapStateToProps)(Page1);
