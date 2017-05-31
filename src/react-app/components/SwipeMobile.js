import React, { Component } from 'react';
import {connect} from 'react-redux';
//import gsap from 'gsap';
import GSAP from 'react-gsap-enhancer';

//utilities
import Pubsub from 'pubsub-js';
var browser = require('browser-size')();

//components


class SwipeMobile extends Component {


  constructor(props) {
  super(props);
    this.state = {

    };
  }

  componentWillMount() {
  	// subscribe
  	// .subscribe returns a unique token necessary to unsubscribe
  	this.pubsub_token = Pubsub.subscribe('mobileNavClicked-' + this.props.id, this.triggerSwipe.bind(this));

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
    this.controller = this.addAnimation(this.createSwipeAnim.bind(this));

  }

  createSwipeAnim({target}) {

      //get the elements
      let link = target.find({name: 'swipe-mobile-inner'});
      //grab the height of the link element from the dom
      let currentLink = document.querySelector('.cd-vertical-nav ul li');
      let linkHeight = currentLink.clientHeight;

      return new TimelineLite({onComplete: this.loadOutDone.bind(this)})
      //.set(link, {autoAlpha: 1}, 0)
      .set(link, {height: linkHeight}, 0)
      .to(link, 0.2, {autoAlpha: 1})
      .to(link, 0.2, {scaleY: '100vh', ease: Power1.easeInOut})
      //.to(link, 0.3, {autoAlpha: 0, ease: Power1.easeInOut})
       //restore everything to original
       //need to end this abruptly so nav doesn't show through
       .set(link, {clearProps:"all"});

   }

   loadOutDone() {
     //callback to parent finished anim
     this.props.onSwipeComplete();
   }


  render() {
  	    return (
  	    	<div className={`swipe-mobile ${(browser.width > 800) ? 'is-hidden' : ''}`}>
            <div name="swipe-mobile-inner" className="swipe-mobile-inner"></div>
  	    	</div>
  	    );
  }
}

function mapStateToProps(state) {
    return {
        nav : state.nav,
    };
}

export default connect(mapStateToProps)(GSAP()(SwipeMobile));

