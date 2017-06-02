import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { removeClass, hasClass } from '../../lib/utils';

//components
import Nav from '../Nav';
import PageWrap from '../pages/PageWrap'
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

//actions
import { changePath, changeScrollPages, changeCurrentPages, 
  changeIsTransitioning, changeNav } from '../../actions/nav';

//utils
import GSAP from 'react-gsap-enhancer';
import Pubsub from 'pubsub-js';
var browser = require('browser-size')();

//data
import pagesData from '../../data/pages';

class ViewInternal extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      pageStatus: 'loading',
      location: '',
    };

    this.scrollValue = 0;
    this.animating = false;
    this.initialIsMobile = false

  }

  componentDidMount() {
    //change page
    this.changePageFromUrl();

    //set the browser widthh on page load
    if(browser.width > 1200) {
      this.initialIsMobile = false;
    } else {
      this.initialIsMobile = true;
    }
  }

  triggerInitialLoad() {
    //keep this here
  }


  changeCurrentPage(toPage) {
    //set the current path
    this.props.dispatch(changePath(location.pathname));
    //update url
    hashHistory.push(`${toPage}`);
    //get the current page from redux and make it the prev. page
    this.props.dispatch(changeCurrentPages([this.props.currentPages[1], toPage]));
    //update the three pages used for scrolling
    this.props.dispatch(changeScrollPages(toPage));
    //store that css animation is starting
    this.props.dispatch(changeIsTransitioning(true));
  }

  changePageFromUrl() {

    //handle initial page load or page refresh...

    //get the hash url
    let location = hashHistory.getCurrentLocation();
    //remove starts with slash
    let pageFromUrl = location.pathname.replace(/^\//, '');


    //check if the current path exists in the pages data and process
    let isValid = _.filter(pagesData, function(item){
      return item.id === pageFromUrl;
    });
    //if the page doesn't exist, forward to the index page
    if (isValid.length === 0) {
      pageFromUrl = 'index';
    }

    //set the current path
    this.props.dispatch(changePath(location.pathname));

    console.log(pageFromUrl);

    //update url
    hashHistory.push(`${pageFromUrl}`);


    this.forceUpdate();

    //run the nav action to populatge the nav reducer with page data
    this.props.dispatch(changeNav(pageFromUrl, true));
    //change page
    this.props.dispatch(changeCurrentPages(['',pageFromUrl]));
    //update the three pages used for scrolling
    this.props.dispatch(changeScrollPages(pageFromUrl));

    this.forceUpdate();

  }


  handlePageLoaded(page) {

    //signify that the page has loaded
    this.setState({ pageStatus: 'loaded' });
  }


  onPageMount(node) {
    if(node) {
      //listen for css animation (navigation) complete
      //whichTransitionEvent tests for different browsers event name
      let animationEvent = this.whichAnimationEvent();
      node.addEventListener(animationEvent, this.onNavAnimated(this, node))
    }
  }

  whichAnimationEvent(){
    //this is just for testing what browser
    //you're using and producing the correct transitioned event name
    var t,
        el = document.createElement("fakeelement");

    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  }


  // return our event handler while capturing an argument in the closure
  onNavAnimated(that, el) {
    return function(e) {

      //animationend fires for each property animated so to prevent
      //having it pick up every time it fires...
      if (e.animationName == 'scaleUp') {

          //remove the animation classes
          removeClass(el, 'pt-page-moveToBottom');
          removeClass(el, 'pt-page-moveToTop');
          removeClass(el, 'pt-page-scaleUp');
          //if prev page, remove the pt-page-current class
          if(hasClass(el, 'prev-page')) {
            removeClass(el, 'pt-page-current');
          }

          //store, animation ended
          that.props.dispatch(changeIsTransitioning(false));
      }

    };
  }
  
  //css animation classes setup:
  //classes when navigating down:

  //prev component has:
  //pt-page-current
  //pt-page-moveToTop
  //pt-page-ontop

  //to current component has:
  //pt-page-current
  //pt-page-scaleUp

  //classes when navigating up:

  //prev component has:
  //pt-page-current
  //pt-page-moveToTBottom
  //pt-page-ontop

  //to current component has:
  //pt-page-current
  //pt-page-scaleUp

  //css classes that are removed on anim. complete
  //remove all but only on the current page:
  //pt-page-current


  render() {

    return (
              <div>
                <Nav navItems={this.props.nav}  changeCurrentPage={this.changeCurrentPage.bind(this)} />
                <div id="pt-main" className="pt-perspective">

                    <div className="page-wrapper-outer index">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'index') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'index') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'index') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'index') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={1} wrappedPage="index" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page1/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer pursuit">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'pursuit') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'pursuit') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'pursuit') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'pursuit') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={2} wrappedPage="pursuit" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page2/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer psychology">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'psychology') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'psychology') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'psychology') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'psychology') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={3} wrappedPage="psychology" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page3/>
                        </PageWrap>
                      </div>
                    </div>
                    
                </div>
              </div>
          )
  }

}


function mapStateToProps(state) {


  return {
    //redux state
    path: state.path,
    nav: state.nav,
    mediaSize: state.mediaSize,
    currentPages: state.currentPages,
    navDirection: state.navDirection,
    scrollPages: state.scrollPages,
  }
}
  
export default connect(mapStateToProps)(GSAP()(ViewInternal));