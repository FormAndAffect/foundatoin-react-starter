import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/nav';
import { hashHistory } from 'react-router';

//utilities
import { toggleClass } from '../lib/utils.js';
import gsap from 'gsap';
var browser = require('browser-size')();
import * as Hammer from 'hammerjs';

//components
import NavComponent from './NavComponent';

class Nav extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentPage: ''
    };

    //this.dragging = false;
    this.xDown = null;                                                        
    this.yDown = null;
    this.docBody = document.body;
    this.main = null; 
  }

  componentDidMount() {
    //setup the mouse
    this.setupMouse(); 
    //setup touch drag
    this.setupDrag();

    //prevent scrollbars
    //document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only

  }

  componentWillUnmount() {
    //remove event listeners
    if (this.docBody.removeEventListener) {
      // IE9, Chrome, Safari, Opera
      this.docBody.removeEventListener("mousewheel", this.onMouseWheelChange.bind(this), false);
      // Firefox
      this.docBody.removeEventListener("DOMMouseScroll", this.onMouseWheelChange.bind(this), false);
    }
    this.main.removeEventListener("touchmove", this.onDrag);   
    this.main.removeEventListener("touchstart", this.onDragStart);
  }



  //-----------------------------------------------------------------------------// 
  //handle mouse scroll
  //-----------------------------------------------------------------------------//

  setupMouse() {
    //add event listeners
    if (this.docBody.addEventListener) {
      // IE9, Chrome, Safari, Opera
      this.docBody.addEventListener("mousewheel", this.onMouseWheelChange.bind(this), false);
      // Firefox
      this.docBody.addEventListener("DOMMouseScroll", this.onMouseWheelChange.bind(this), false);
    }
    // IE 6/7/8
    else this.docBody.attachEvent("onmousewheel", this.onMouseWheelChange.bind(this));
  }


  onMouseWheelChange(e) {

    e.preventDefault();

    //console.log('animating: ', this.animating );

    //if not during css transition or on three scene page
    if(!this.props.isTransitioning) {
      // cross-browser
      e = window.event || e;
      // capture the wheel delta and force it to either 1 or -1
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      var speed = 1;
      var delta = delta * speed;

      //if going down, and it's not on the first page...
      if(delta === -1 && (this.props.currentPages[1] !== 'psychology')) {
        //scroll down, change page
        this.onOptionClick(this.props.scrollPages[2]);
      //if going up, and it's not on the last page...
      } else if (delta === 1 && (this.props.currentPages[1] !== 'index')) {
       //scroll up, change page
        this.onOptionClick(this.props.scrollPages[0]);

      }
    }

  }

  //-----------------------------------------------------------------------------// 
  //touch dragging
  //-----------------------------------------------------------------------------//

  setupDrag() {

    this.main = document.querySelector('#pt-main');
    //when dragging
    this.main.addEventListener("touchmove", this.onDrag.bind(this));   
    //on drag start
    this.main.addEventListener("touchstart", this.onDragStart.bind(this));

    //Hammer time
    let mc = Hammer.default(this.main);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on("swipeup", this.onSwipeUp.bind(this));
    mc.on("swipedown", this.onSwipeDown.bind(this));

  }                                                 

  onDragStart(evt) {

    //evt.preventDefault();

    this.xDown = evt.touches[0].clientX;                                     
    this.yDown = evt.touches[0].clientY;

  };



  onDrag(evt) {

    //prevent the entire page from moving with the drag
    evt.preventDefault();
    //stop bubling up
    evt.stopPropagation();                            
  }

  onSwipeUp() {
    //up swipe change page
    if (this.props.currentPages[1] !== 'psychology') {
      this.onOptionClick(this.props.scrollPages[2]);
    }

  }

  onSwipeDown() {
    //down swipe change page
    if(this.props.currentPages[1] !== 'index') {
      this.onOptionClick(this.props.scrollPages[0]);
    }

  }


  //-----------------------------------------------------------------------------// 
  //end touch dragging
  //-----------------------------------------------------------------------------//


  onOptionClick(option) {

    //if selected the current page again, do nothing
    if(this.props.currentPages[1] !== option) {

      //reset all items first
      this.props.nav.map((item) => {
        this.props.changeNav(item.id, false);
      });

      //set the current nav item
      this.props.changeNav(option, true);
      console.log('this.props.changeNav: ', this.props.changeNav);

      //update the nav direction (prev-page, to-page)
      this.props.calcNavDirection(this.props.currentPages[1], option);

      this.setState({currentPage: option}, () => {
        //turn this off and include it in onSwipeComplete and onMobileSwipeComplete
        //to have transition happen after swipe but must find way to fade out current page first
        this.props.changeCurrentPage(this.state.currentPage);
      });
    }

  }

  renderButtons() {

    //include these above NavComponent to enable swipe
    //<Swipe onSwipeComplete={that.onSwipeComplete.bind(that)} color1="#fff" color2="#000" id={item.id}/>
    //<SwipeMobile onSwipeComplete={that.onMobileSwipeComplete.bind(that)} color1="#fff" id={item.id}/>

    let that = this;
    let buttonList = this.props.navItems.map(function(item) {
      return(
              <NavComponent
                key={item.id}
                name={item.name} 
                onClickProp={that.onOptionClick.bind(that, item.id)}
                isActive={item.isSet ? "active" : ""}
                classProp={`${item.class}`}
              />
        )
    });

    return buttonList;

  }

  render() {
    return (

        <nav className="nav" role="navigation">
          {this.renderButtons()}
        </nav>

    );
  }
}


function mapStateToProps(state) {
    return {
        nav: state.nav,
        currentPages: state.currentPages,
        scrollPages: state.scrollPages,
        isTransitioning: state.isTransitioning,
        endPages: state.endPages

    };
}

export default connect(mapStateToProps, actions)(Nav);