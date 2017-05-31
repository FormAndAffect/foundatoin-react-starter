import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import enableInlineVideo from 'iphone-inline-video';
var browser = require('browser-size')();

//utils
//import { refsToArray } from '../../lib/utils';
import gsap from 'gsap';


class Page6 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false,
      currentVid: null
    }

    this.isMobile = false;

    this.contentToLoad = 0;
    this.contentLoaded = 0;
  }

  componentWillMount() {

  }

  componentDidMount() {

    //notify component starting to load (for wrapper loading animation)
    this.props.onPageStarting();

    //setup loaded event listener
    let vid1 = this.refs.largeContent1;

    //enable iphone inline video
    enableInlineVideo(vid1);

    vid1.onloadeddata = this.onVideoLoaded.bind(this);

    this.setState({currentVid: vid1}, () => {

      //for now just mimic all loaded
      this.onVideoLoaded();

      //watch for browser resize
      browser.on('resize', this.checkIsMobile.bind(this));
      //set checkIsMobile
      this.checkIsMobile();
    });

  }

  checkIsMobile() {
      
      //if not mobile
      if (browser.width > 768) {
        if(this.isMobile === true) {
          this.isMobile = false;

          this.setSrc(0);

        }

      } 
      //if mobile
      else {
        if(this.isMobile === false) {
          this.isMobile = true;

          this.setSrc(1);

        }
    }
  }


  makeRef(node){ 
    //apply the ref name and increment
    this.contentToLoad++;
  }

  onVideoLoaded(e) {

    if(!this.state.allLoaded) {

      //just fade in the page
      let tl = new TimelineLite({onComplete: this.pageAnimComplete.bind(this)});
        tl
          .to(this.refs.section, 0.5, {autoAlpha: 1}, 1.0)
          .set(this.refs.willShow, {autoAlpha: 0, scale:0.7}, 0)
          .to(this.refs.willShow, 0.3, {autoAlpha: 1, scale:1}, "-=0.3");

      this.setState({allLoaded: true});
    }

  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }

  setSrc(n) {

    var v = new Array();
    //single selection
    v[0] = [
            "assets/media/videos/stats/7/7-lrg.webm",
            "assets/media/videos/stats/7/7-lrg.mp4"
            ];
    v[1] = [
            "assets/media/videos/stats/7/7-sml.webm",
            "assets/media/videos/stats/7/7-sml.mp4"
            ];
    
    //webm
    if(Modernizr.video && Modernizr.video.webm) {
        this.state.currentVid.setAttribute("src", v[n][0]);
    } 
    //mpeg4
    else if(Modernizr.video && Modernizr.video.h264) {
        this.state.currentVid.setAttribute("src", v[n][1]);
    }
    // else if(Modernizr.video && Modernizr.video.ogg) {
    //     this.state.currentVid.setAttribute("src", v[n][1]);
    // }

    this.state.currentVid.load();
    this.state.currentVid.play();

  }

  render() {
          return (
                <div>
                  <section ref="section" name="section" className="page-content slide stats row expanded align-middle align-center">
                    <div className="small-10 medium-order-2 medium-6 columns stat">
                      <div ref="willShow" className="will-reveal">
                        <h2 className="fromTop">0.7</h2>
                        <h4 className="fromRight">seconds<br/>in the air</h4>
                        <p className="fromBottom">With very little hang-time, skaters have to achieve their first rotation at take-off – within just 0.08 seconds. At the apex of the jump they are in their third rotation, with one more rotation to go before landing. Compared to the triple toe loop, the extra rotation in a quad is done with only 0.03 extra seconds of flight time.</p>
                      </div>
                    </div>
                    <div className="small-12 medium-order-1 medium-6 columns video">
                      <video ref={"largeContent1"} className="bgvid" autoPlay playsInline loop poster="assets/media/videos/stats/7/7-poster.jpg">
                        <source src="assets/media/videos/stats/7/7-lrg.webm" type="video/webm"/>
                        <source src="assets/media/videos/stats/7/7-lrg.mp4" type="video/mp4"/>
                      </video>
                    </div>
                  </section>
                </div>

            )
      }
}

function mapStateToProps(state) {
  return {
    currentPages: state.currentPages
  }
}
      
export default connect(mapStateToProps)(Page6);
