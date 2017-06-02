import React, { Component } from 'react';
import {connect} from 'react-redux';
var browser = require('browser-size')();
import {store} from '../app';
import watch from 'redux-watch';

class NavComponent extends Component {

	constructor(props) {

	  super(props);
	  this.state = {
	  	isDisabled : false
	  }
	  //the canvas holder
	  this.threeScene = null;
	  
	}

	//props: name, isActive, onClickProp, classProp, icon

	componentDidMount() {
		// watch for nav enabled change in root store
		let w = watch(store.getState, 'navDisabled')
		store.subscribe(w((newVal, oldVal, objectPath) => {
		  if(newVal === true) {
		    //disable nav
		    this.setState({isDisabled: true});
		  } else {
		  	//give it a bit of time before enabling nav
		  	setTimeout(() => {
		  		this.setState({isDisabled: false});
		  	}, 500);
		  	
		  }
		}))

		//add click event (safari)
		this.refs.navComponent.addEventListener('click', this.onClick.bind(this));
		
		//add enter key press event
		this.refs.navComponent.addEventListener("keyup", this.onKeyUp.bind(this));
	}
	
	onKeyUp(e) {
		e.preventDefault();
	   if (e.keyCode == 13) {
		   //console.log('enter pressed');
			if(!this.state.isDisabled) {
				this.props.onClickProp();
			}
	   }
	}

	componentWillUnmount() {
	  //remove
	  this.refs.navComponent.removeEventListener('click', this.onOptionClick.bind(this));
	}
	
	
	


	 onClick(e) {
	 	if(!this.state.isDisabled) {
	 		this.props.onClickProp();
	 	}

	 }

	 render() {
	 	return (
	 		<a ref="navComponent" onClick={this.onClick.bind(this)} tabIndex="0" className={`dot ${this.props.classProp} ${this.props.isActive}`} ><span>{this.props.name}</span></a>
	 		);
	 }

}

function mapStateToProps(state) {
	return {
		nav : state.nav,
		navDisabled: store.navDisabled
	};
}

export default connect(mapStateToProps)(NavComponent);