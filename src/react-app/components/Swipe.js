import React, { Component } from 'react';
import {connect} from 'react-redux';
//import gsap from 'gsap';
import GSAP from 'react-gsap-enhancer';

//utilities
import Pubsub from 'pubsub-js';
var browser = require('browser-size')();

//components


class Swipe extends Component {


  constructor(props) {
  super(props);
    this.state = {
      isPriority : false
    };
    this.controller = null;
  }

  componentWillMount() {
  	// subscribe
  	// .subscribe returns a unique token necessary to unsubscribe
  	this.pubsub_token = Pubsub.subscribe('navClicked-' + this.props.id, this.triggerSwipe.bind(this));

    //browser.on('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    //console.log(browser.width, browser.height)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    Pubsub.unsubscribe(this.pubsub_token);
  }

  triggerSwipe(topic, navItem) {

    //grigger react-gsap-enhancer
    this.controller = this.addAnimation(this.createAnim.bind(this));
  }

  createAnim({target}) {

    //get the elements
    let outerCircle = target.find({name: 'outer-circle'});
    let innerCircle = target.find({name: 'inner-circle'});

    //get twice the screenwidth (in vw and vh values)
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    //find the longest side of the window
    let winSize = Math.max(ww,wh);

    let w = Math.round(winSize/10);

    return new TimelineLite({onComplete: this.onSwipeComplete.bind(this)})
     .set(outerCircle, {autoAlpha: 1}, 0)
     .set(innerCircle, {autoAlpha: 1}, 0)
     .to(outerCircle, 0.2, {scale: w, x: -ww/2, y: 0, ease: Power1.easeInOut})
     .to(innerCircle, 0.3, {scale: w, x: -ww/2, y: 0, ease: Power1.easeInOut}, 0.05)
     //restore outer circle to original
     .set(outerCircle, {clearProps:"all"})
     //fade out inner circle
     .to(innerCircle, 0.5, {autoAlpha: 0, ease: Power1.easeInOut})
     //restore inner circle to original
     .set(innerCircle, {clearProps:"all"})
     

  }

  onSwipeComplete() {
    //callback to parent completed animation
    this.props.onSwipeComplete();
  }


  render() {
  	    return (
  	    	<div className={`swipe ${(browser.width < 800) ? 'is-hidden' : ''}`}>
	  	    	<div name="inner-circle" className="inner-circle"></div>
	  	    	<div name="outer-circle" className="outer-circle"></div>
  	    	</div>
  	    );
  }
}

function mapStateToProps(state) {
    return {
        nav : state.nav,
    };
}

export default connect(mapStateToProps)(GSAP()(Swipe));

