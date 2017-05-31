import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import enableInlineVideo from 'iphone-inline-video';
import {store} from '../../app';

//utils
import watch from 'redux-watch';
import gsap from 'gsap';
import { addClass, removeClass } from '../../lib/utils';
var browser = require('browser-size')();



class Page2 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false,
      isMobile: false

    }
    this.currentVid = null;
    this.contentToLoad = 0;
    this.contentLoaded = 0;
  }

  componentDidMount() {

    //notify component starting to load (for wrapper loading animation)
    this.props.onPageStarting();

    //setup loaded event listener
    let vid1 = this.refs.largeContent1;

    //enable iphone inline video
    enableInlineVideo(vid1);

    vid1.onloadeddata = this.onVideoLoaded.bind(this);

    this.currentVid = vid1;

    //for now just mimic all loaded
    this.onVideoLoaded();
    //paint video to bg canvas
    this.paintToCanvas();



    //call to unload scene if navigating away from this page
    // if changing pages and vid playing, stop the video
    let w = watch(store.getState, 'currentPages')
    store.subscribe(w((newVal, oldVal, objectPath) => {

      if(this.currentVid) {
        if((newVal[1] !== this.props.currentPages[1]) && (!this.currentVid.paused)) {
          // Pause the video
            var el = this.refs.jsVideoControl;
            this.refs.largeContent1.load();
            removeClass(el, 'playing');
            addClass(el, 'paused');

        }
      }

    }))

    //listen for video complete event
    vid1.addEventListener('ended',this.onVideoEnded.bind(this),false);

    //watch for browser resize
    browser.on('resize', this.checkIsMobile.bind(this));
    //set checkIsMobile
    this.checkIsMobile();


  }

  onVideoEnded(e) {
    //add the paused class to the playbutton
    addClass(this.refs.jsVideoControl, 'paused');
    removeClass(this.refs.jsVideoControl, 'playing');
    //load the vid again to show the poster
    e.target.load();

    //fade back in the background image over the canvas
    let tl = new TimelineLite();
      tl
        .to(this.refs.heroBg, 0.3, {autoAlpha: 1});

  }

  componentWillUnmount() {
    //remove event listener
    this.currentVid.removeEventListener('ended',this.onVideoEnded,false);
    this.currentVid = null;
  }


  //VideoPLayer
  playVideo(e) {

    e.preventDefault()

    //fade out the background image over the canvas
    let tl = new TimelineLite();
      tl
        .to(this.refs.heroBg, 0.3, {autoAlpha: 0});

    let el = e.target;

    var video = this.refs.largeContent1;

    if (video.paused) {
        // Play the video
        video.play();
        removeClass(el, 'paused');
        addClass(el, 'playing');
    }
    else {
        // Pause the video
        video.pause();
        removeClass(el, 'playing');
        addClass(el, 'paused');
    }
  }



  paintToCanvas() {

      var v = this.refs.largeContent1;
      var canvas = this.refs.vidCanvas;

      var context = canvas.getContext('2d');

      var cw = 192;
      var ch = 108;
      canvas.width = cw;
      canvas.height = ch;

      v.addEventListener('play', function(){
          draw(this,context,cw,ch);
      },false);

      function draw(v,c,w,h) {

        if(v.paused || v.ended) return false;
        c.drawImage(v,0,0,w,h);
        setTimeout(draw,20,v,c,w,h);
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
          .to(this.refs.section, 0.5, {autoAlpha: 1}, 1.0);

      this.setState({allLoaded: true});
    }

  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }


  checkIsMobile() {
      
      //if not mobile
      if (browser.width > 768) {
        if(this.state.isMobile === true) {
          //show video
          removeClass(this.refs.largeContent1, 'hidden');
          if(this.refs.currentComponent) {
            this.setState({isMobile: false});
          }

        }

      } 
      //if mobile
      else {
        if(this.props.isMobile === false) {
          //pause video if playing
          var video = this.refs.largeContent1;
          if(video) {
            video.pause();
          }
          //hide video
          addClass(video, 'hidden');
          if(this.refs.currentComponent) {
            this.setState({isMobile: true});
          }
          video = null;
        }
    }
  }

  killVidAndCanvas() {

  }


  render() {
          return (

            <div ref="currentComponent">

            <section ref="section" name="section" className="page-content slide intro row expanded align-center align-middle">
                  
            <canvas ref="vidCanvas" id='vidsync' className="show-for-large"></canvas>

            <div ref="heroBg" className="heroBg show-for-large"></div>

            <div ref="heroBgSmall" className="heroBg-small hide-for-large"></div>

            <div className="small-10">

            <div className="flex-video widescreen vimeo hide-for-large">
            <iframe src="http://player.vimeo.com/video/209256937" allowFullScreen></iframe>
            </div>

					  <video ref={"largeContent1"} className="video-player show-for-large" id="hero-video" playsInline controls poster="assets/img/poster-hero-lg.jpg">
						  <source src="assets/media/videos/hero/hero.webm" type="video/webm"/>
						  <source src="assets/media/videos/hero/hero.mp4" type="video/mp4"/>
					  </video>
                </div>
              </section>

            </div>
            )
      }
}

function mapStateToProps(state) {
  return {
    currentPages: state.currentPages,
    isMobile: state.isMobile
  }
}
      
export default connect(mapStateToProps)(Page2);
