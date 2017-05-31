import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it
export default function (ComposedComponent, compData) {
    class HOCView extends Component {

      constructor(props) {

        super(props);

        this.state = {
          //height: 600
        }
        
      }

      componentDidMount() {
        //this.setState({height: window.innerHeight});
      }

      onOptionClick(option) {

        console.log('option clicked');

      }

      render() {
              //pass this.state and this.props to the composed component
              //access them both as this.props in the compoesed component
              return <ComposedComponent ref='composedComponent' {...this.props} {...this.state} onOptionClick={this.onOptionClick.bind(this)} />
              
          }
      }

      function mapStateToProps(state) {
        return {
          //redux state
          nav: state.nav
        }
      }
          
      return connect(mapStateToProps)(HOCView);
}