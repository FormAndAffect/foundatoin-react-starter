import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import enableInlineVideo from 'iphone-inline-video';
var browser = require('browser-size')();


//utils
//import { refsToArray } from '../../lib/utils';
import gsap from 'gsap';


class Page5 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false,
      currentVid: null
    }

    this.contentToLoad = 0;
    this.contentLoaded = 0;

    this.isMobile = false;
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

          console.log('not mobile');

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
            "assets/media/videos/stats/60cm/60cm-lrg.webm",
            "assets/media/videos/stats/60cm/60cm-lrg.mp4"
            ];
    v[1] = [
            "assets/media/videos/stats/60cm/60cm-sml.webm",
            "assets/media/videos/stats/60cm/60cm-sml.mp4"
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
                    <div className="small-10 medium-6 columns stat">
                      <div ref="willShow" className="will-reveal odd">
                        <h2 className="fromTop">0.6</h2>
                        <h4 className="fromRight">metres<br/>off the ice</h4>
                        <p className="fromBottom">Top skaters generate well over 3 m per second of vertical velocity at take-off – roughly similar to elite long jumpers – and need 60 cm of air to complete the required rotations in a quad. Just shy of the average NBA vertical leap, skaters reach these heights on blades that are 4 mm thick.</p>
                      </div>
                    </div>
                    <div className="small-12 medium-6 columns video">
                      <video ref={"largeContent1"} className="bgvid" autoPlay playsInline loop poster="assets/media/videos/stats/60cm/60cm-poster.jpg">
                        <source src="assets/media/videos/stats/60cm/60cm-lrg.webm" type="video/webm"/>
                        <source src="assets/media/videos/stats/60cm/60cm-lrg.mp4" type="video/mp4"/>
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
      
export default connect(mapStateToProps)(Page5);
