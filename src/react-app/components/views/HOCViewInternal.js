import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//actions
import * as actions from '../../actions/sample';

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it
export default function (ComposedComponent, compData) {
    class HOCViewInternal extends Component {

      constructor(props) {
        super(props);
        this.state = {

        }
      }

      onOptionClick(option) {

        console.log('option clicked');

      }


      render() {
              //pass this.state and this.props to the composed component
              //access them both as this.props in the compoesed component
              return <ComposedComponent ref='composedComponent' onOptionClick={this.onOptionClick.bind(this)} {...this.props} {...this.state} />
              
          }
      }

      function mapStateToProps(state) {
        return {
          //redux state
          sample: state.sample,
          nav: state.nav,
        }
      }
          
      return connect(mapStateToProps, actions)(HOCViewInternal);
}