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
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import Page6 from '../pages/Page6';
import Page7 from '../pages/Page7';
import Page8 from '../pages/Page8';
import Page9 from '../pages/Page9';
import Page10 from '../pages/Page10';
import Page11 from '../pages/Page11';
import Page12 from '../pages/Page12';
import Page13 from '../pages/Page13';
import Page14 from '../pages/Page14';

//actions
import { changePath, changeScrollPages } from '../../actions/nav';
import { changeCurrentPages, changeIsTransitioning } from '../../actions/nav';

//utils
import GSAP from 'react-gsap-enhancer';
import Pubsub from 'pubsub-js';
var browser = require('browser-size')();
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

  componentWillMount() {
    //change page
    this.changePageFromUrl();

    //set the browser widthh on page load
    if(browser.width > 1200) {
      this.initialIsMobile = false;
    } else {
      this.initialIsMobile = true;
    }
  }

  componentDidMount() {

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
    //get the hash url
    let location = hashHistory.getCurrentLocation();
    //remove starts with slash
    let pageFromUrl = location.pathname.replace(/^\//, '');


    //check if the current path exists in the pages data and process
    let isValid = _.filter(pagesData, function(item){
      return item === pageFromUrl;
    });

    if (isValid.length === 0) {
      pageFromUrl = 'index';
    } 

    //set the current path
    this.props.dispatch(changePath(location.pathname));
    //update url
    hashHistory.push(`${pageFromUrl}`);
    //change page
    this.props.dispatch(changeCurrentPages(['',pageFromUrl]));
    //update the three pages used for scrolling
    this.props.dispatch(changeScrollPages(pageFromUrl));

  }


  handlePageLoaded(page) {

    //signify that the page has loaded
    this.setState({ pageStatus: 'loaded' });

    //kill all animations on component
    //this.controller.kill();

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

          //special case for the three scene
          //notify when transition has finiehed to then load the 3d scene
          if(that.props.currentPages[1] === 'anatomy') {
            Pubsub.publish('loadThreeScene', "loadScene");
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
                    
                    <div className="page-wrapper-outer jumps">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'jumps') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'jumps') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'jumps') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'jumps') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={4} wrappedPage="jumps" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page4/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer height">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'height') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'height') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'height') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'height') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={5} wrappedPage="height" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page5/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer hangtime">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'hangtime') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'hangtime') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'hangtime') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'hangtime') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={6} wrappedPage="hangtime" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page6/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer rotation">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'rotation') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'rotation') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'rotation') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'rotation') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={7} wrappedPage="rotation" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page7/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer landing">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'landing') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'landing') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'landing') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'landing') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={8} wrappedPage="landing" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page8/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer perspective">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'perspective') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'perspective') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'perspective') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'perspective') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={9} wrappedPage="perspective" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page9/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer stages">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'stages') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'stages') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'stages') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'stages') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={10} wrappedPage="stages" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page10/>
                        </PageWrap>
                      </div>
                    </div>


                      <div className="page-wrapper-outer anatomy">
                        <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'anatomy') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'anatomy') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'anatomy') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'anatomy') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                          <PageWrap key={11} wrappedPage="anatomy" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                            <Page11/>
                          </PageWrap>
                        </div>
                      </div>

                    <div className="page-wrapper-outer firsts">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'firsts') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'firsts') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'firsts') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'firsts') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={12} wrappedPage="firsts" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page12/>
                        </PageWrap>
                      </div>
                    </div>


                    <div className="page-wrapper-outer quint">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'quint') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'quint') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'quint') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'quint') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={13} wrappedPage="quint" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page13/>
                        </PageWrap>
                      </div>
                    </div>

                    <div className="page-wrapper-outer promo">
                      <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'promo') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'promo') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'promo') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'promo') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
                        <PageWrap key={14} wrappedPage="promo" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
                          <Page14/>
                        </PageWrap>
                      </div>
                    </div>

                </div>
              </div>
          )
  }

}


// { !this.state.initialIsMobile &&

// }


// '
// <div className="page-wrapper-outer anatomy">
//   <div ref={this.onPageMount.bind(this)} className={`pt-page ${(this.props.currentPages[0] === 'anatomy') ? 'pt-page-current pt-page-ontop prev-page' : ''} ${((this.props.currentPages[0] === 'anatomy') && (this.props.navDirection === 'down')) ? 'pt-page-moveToTop' : ''} ${((this.props.currentPages[0] === 'anatomy') && (this.props.navDirection === 'up')) ? 'pt-page-moveToBottom' : ''} ${(this.props.currentPages[1] === 'anatomy') ? 'pt-page-current pt-page-scaleUp' : ''}`}>
//     <PageWrap key={11} wrappedPage="anatomy" onLoading={this.triggerInitialLoad.bind(this)} onLoaded={this.handlePageLoaded.bind(this)}>
//       <Page11/>
//     </PageWrap>
//   </div>
// </div>

// '



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