import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/nav';

//utilities
import * as Hammer from 'hammerjs';

//components
import NavComponent from './NavComponent';

//data
import pagesData from '../data/pages';

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
    this.firstPage = '';
    this.lastPage = '';
  }

  componentWillMount() {
    //find the index of the current page to see if it's first or last
    this.firstPage = pagesData[0].id;
    this.lastPage = pagesData[pagesData.length - 1].id;
  }

  componentDidMount() {
    //setup the mouse
    this.setupMouse(); 
    //setup touch drag
    this.setupDrag();

    //prevent scrollbars
    //document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = 'no'; // ie only
  }

  componentWillUnmount() {
    //remove event listeners
    if(this.docBody.removeEventListener) {
      // IE9, Chrome, Safari, Opera
      this.docBody.removeEventListener('mousewheel', this.onMouseWheelChange.bind(this), false);
      // Firefox
      this.docBody.removeEventListener('DOMMouseScroll', this.onMouseWheelChange.bind(this), false);
    }
    this.main.removeEventListener('touchmove', this.onDrag);   
    this.main.removeEventListener('touchstart', this.onDragStart);
  }

  //-----------------------------------------------------------------------------// 
  //events
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

      //update the nav direction (prev-page, to-page)
      this.props.calcNavDirection(this.props.currentPages[1], option);

      this.setState({ currentPage: option }, () => {
        //turn this off and include it in onSwipeComplete and onMobileSwipeComplete
        //to have transition happen after swipe but must find way to fade out current page first
        this.props.changeCurrentPage(this.state.currentPage);
      });
    }
  }


  //-----------------------------------------------------------------------------// 
  //handle mouse scroll
  //-----------------------------------------------------------------------------//


  onMouseWheelChange(e) {
    e.preventDefault();

    //console.log('animating: ', this.animating );

    //if not during css transition or on three scene page
    if(!this.props.isTransitioning) {
      // cross-browser
      e = window.event || e;
      // capture the wheel delta and force it to either 1 or -1
      let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      let speed = 1;
      delta = delta * speed;

      //if going down, and it's not on the last page...
      if(delta === -1 && (this.props.currentPages[1] !== this.lastPage)) {
        //scroll down, change page
        this.onOptionClick(this.props.scrollPages[2]);
      //if going up, and it's not on the first page...
      } else if (delta === 1 && (this.props.currentPages[1] !== this.firstPage)) {
       //scroll up, change page
        this.onOptionClick(this.props.scrollPages[0]);
      }
    }
  }

  setupMouse() {
    //add event listeners
    if(this.docBody.addEventListener) {
        // IE9, Chrome, Safari, Opera
        this.docBody.addEventListener('mousewheel', this.onMouseWheelChange.bind(this), false);
        // Firefox
        this.docBody.addEventListener('DOMMouseScroll', this.onMouseWheelChange.bind(this), false);
      } else {
        // IE 6/7/8
        this.docBody.attachEvent('onmousewheel', this.onMouseWheelChange.bind(this));
      }
  }

  //-----------------------------------------------------------------------------// 
  //touch dragging
  //-----------------------------------------------------------------------------//

  setupDrag() {
    this.main = document.querySelector('#pt-main');
    //when dragging
    this.main.addEventListener('touchmove', this.onDrag.bind(this));   
    //on drag start
    this.main.addEventListener('touchstart', this.onDragStart.bind(this));

    //Hammer time
    const mc = Hammer.default(this.main);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on('swipeup', this.onSwipeUp.bind(this));
    mc.on('swipedown', this.onSwipeDown.bind(this));
  }                                                 

  onDragStart(evt) {
    //evt.preventDefault();
    this.xDown = evt.touches[0].clientX;                                     
    this.yDown = evt.touches[0].clientY;
  }


  onDrag(evt) {
    //prevent the entire page from moving with the drag
    evt.preventDefault();
    //stop bubling up
    evt.stopPropagation();                            
  }

  onSwipeUp() {
    //up swipe change page
    if (this.props.currentPages[1] !== this.lastPage) {
      this.onOptionClick(this.props.scrollPages[2]);
    }
  }

  onSwipeDown() {
    //down swipe change page
    if(this.props.currentPages[1] !== this.firstPage) {
      this.onOptionClick(this.props.scrollPages[0]);
    }
  }


  //-----------------------------------------------------------------------------// 
  //end touch dragging
  //-----------------------------------------------------------------------------//


  renderButtons() {
    let that = this;
    let buttonList = this.props.navItems.map((item) => {
      return(
              <NavComponent
                key={item.id}
                name={item.name} 
                onClickProp={that.onOptionClick.bind(that, item.id)}
                isActive={item.isSet ? 'active' : ''}
                classProp={`${item.class}`}
              />
        );
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
    };
}

export default connect(mapStateToProps, actions)(Nav);
