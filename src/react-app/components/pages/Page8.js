import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import enableInlineVideo from 'iphone-inline-video';
var browser = require('browser-size')();

//utils
//import { refsToArray } from '../../lib/utils';
import gsap from 'gsap';


class Page8 extends Component {

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
            "assets/media/videos/stats/10x/10x-lrg.webm",
            "assets/media/videos/stats/10x/10x-lrg.mp4"
            ];
    v[1] = [
            "assets/media/videos/stats/10x/10x-sml.webm",
            "assets/media/videos/stats/10x/10x-sml.mp4"
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
                        <h2 className="fromTop">10x</h2>
                        <h4 className="fromRight">bodyweight<br/>on landing</h4>
                        <p className="fromBottom">What goes up must come down, and a 150 lbs male skater can land with the force of a one-year-old elephant (over 1000 lbs). In contrast to jogging (2.5 times body weight) and jumping sports like volleyball and basketball (3 to 4 times body weight), skaters absorb the impact on landing through a thin blade on hard ice.</p>
                      </div>
                    </div>
                    <div className="small-12 medium-order-1 medium-6 columns video">
                      <video ref={"largeContent1"} className="bgvid" autoPlay playsInline loop poster="assets/media/videos/stats/10x/10x-poster.jpg">
                        <source src="assets/media/videos/stats/10x/10x-lrg.webm" type="video/webm"/>
                        <source src="assets/media/videos/stats/10x/10x-lrg.mp4" type="video/mp4"/>
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
      
export default connect(mapStateToProps)(Page8);
