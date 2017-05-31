import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonComponent from './ButtonComponent';
import _ from 'lodash';
import gsap from 'gsap';
import enableInlineVideo from 'iphone-inline-video';
import { addClass, removeClass } from '../lib/utils';
var browser = require('browser-size')();


//import { DefaultPlayer as Video } from 'react-html5video';
//import 'react-html5video/dist/styles.css';


class Page2 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      currentVid: null,
      isVidChange: false,
      //isOnionButton: { id: 'onionSkin', isSet: false, name: "Onion Skin", class: "vid1 vid-bttn", icon: "" },
      jumpButtons: [
        { id: 'single', isSet: true, name: "Single", class: "vid-bttn", icon: ""},
        { id: 'double', isSet: false, name: "Double", class: "vid-bttn", icon: "" },
        { id: 'triple', isSet: false, name: "Triple", class: "vid-bttn", icon: "" },
        { id: 'quad', isSet: false, name: "Quad", class: "vid-bttn", icon: "" },
      ],
      //to record the last jump button selected
      recentJumpButton: '',
      compButton: { id: 'comp', isSet: false, name: "Compare Jumps", class: "vid-bttn", icon: ""},
    }

    this.isMobile = false;
    
  }


  componentDidMount() {

    let vid1 = this.refs.largeConent1;

    //enable iphone inline video
    //enableInlineVideo(vid1);

    this.setState({currentVid: vid1}, () => {

      vid1.onloadeddata = this.handleLoaded.bind(this);

      //watch for browser resize
      browser.on('resize', this.checkIsMobile.bind(this));
      //set checkIsMobile
      this.checkIsMobile();

      //listen for video complete event
      vid1.addEventListener('ended',this.onVideoEnded.bind(this),false);

    });


  }

  componentWillUnmount() {
    //remove event listener
    this.state.currentVid.removeEventListener('ended',this.onVideoEnded,false);
  }

  onVideoEnded(e) {
    //fade out video player
    var tl = new TimelineLite({onComplete: onVidReset.bind(this)});
      tl
      .to(this.state.currentVid, 0.2, {autoAlpha: 0});

      function onVidReset() {
        //put back in the poster image
        this.state.currentVid.load();
        this.state.currentVid.pause();
        //fade back in the video player
        //fade in video player
        var tl = new TimelineLite();
        tl
          .to(this.state.currentVid, 0.2, {autoAlpha: 1});
          tl = null;
        //unhide the play button
        removeClass(this.refs.vidPlayControl, 'hidden');

      }
  }



  handleLoaded(e) {

    if(!this.state.isVidChange) {
      //signal content loaded
      this.props.handleLoaded();
    }

  }

  onVidBtnClick(e) {
    e.preventDefault();
    this.playVid();
  }

  playVid(){

    //hide play button when vid playing
    addClass(this.refs.vidPlayControl, 'hidden');
    //fade out video player
    var tl = new TimelineLite({onComplete: onVidReset.bind(this)});
     tl
      .to(this.state.currentVid, 0, {autoAlpha: 0})

      
      function onVidReset() {


        //to make sure handleLoaded doesn't get fired every time video plays
        this.setState({isVidChange: true});


        //find the selcted jump types
        var data = _.filter(this.state.jumpButtons, function(item){
          return item.isSet === true;
        });

        if(data) {

          //refine the returned data array of objects
          var jumpTypes = [];
          if(data[0]) {
            jumpTypes.push(data[0].id);
          }
          if(data[1]) {
            jumpTypes.push(data[1].id);
          }

          if(!this.isMobile) {

            //if only one jump type selected
            if (jumpTypes.length === 1) {

              //onionskin - 1 selection
              //----------------------
              if(jumpTypes[0] === 'single') {
                console.log('onion/single');
                this.setSrc(0);
              }
              else if(jumpTypes[0] === 'double') {
                console.log('onion/double');
                this.setSrc(1);
              }
              if(jumpTypes[0] === 'triple') {
                console.log('onion/triple');
                this.setSrc(2);
              }
              else if(jumpTypes[0] === 'quad') {
                console.log('onion/quad');
                this.setSrc(3);
              }

            } 
            //if two jump types selected
            else if (jumpTypes.length === 2) {
              
              //normal - 2 selections
              //----------------------

              //single...
              if(jumpTypes.includes('single') && jumpTypes.includes('double')) {
                console.log('normal/single/double');
                this.setSrc(4);
              }
              else if(jumpTypes.includes('single') && jumpTypes.includes('triple')) {
                console.log('normal/single/triple');
                this.setSrc(5);
              }
              else if(jumpTypes.includes('single') && jumpTypes.includes('quad')) {
                console.log('normal/single/quad');
                this.setSrc(6);
              }
              //double...
              if(jumpTypes.includes('double') && jumpTypes.includes('triple')) {
                console.log('normal/double/triple');
                this.setSrc(7);
              }
              else if(jumpTypes.includes('double') && jumpTypes.includes('quad')) {
                console.log('normal/double/quad');
                this.setSrc(8);
              }
              //triple...
              if(jumpTypes.includes('triple') && jumpTypes.includes('quad')) {
                console.log('normal/triple/quad');
                this.setSrc(9);
              }

            }
            //else error
            else {
              console.log('error selecting video')
            }

          } 
          //if mobile
          else {

            //onionskin - 1 selection
            //----------------------
            if(jumpTypes[0] === 'single') {
              console.log('onion/single(mobile)');
              //set poster
              //this.state.currentVid.setAttribute('poster','assets/media/videos/jumps/single/sml/single-sml.gif');
              this.refs.fallbackImg.src = 'assets/media/videos/jumps/single/sml/single-sml.gif';
              this.setSrc(10);
            }
            else if(jumpTypes[0] === 'double') {
              console.log('onion/double(mobile)');
              //set poster
              this.refs.fallbackImg.src = 'assets/media/videos/jumps/double/sml/double-sml.gif';
              this.setSrc(11);
            }
            if(jumpTypes[0] === 'triple') {
              console.log('onion/triple(mobile)');
              //set poster
              //this.state.currentVid.setAttribute('poster','assets/media/videos/jumps/triple/sml/triple-sml.gif');
              this.refs.fallbackImg.src = 'assets/media/videos/jumps/triple/sml/triple-sml.gif';
              this.setSrc(12);
            }
            else if(jumpTypes[0] === 'quad') {
              console.log('onion/quad(mobile)');
              //set poster
              //this.state.currentVid.setAttribute('poster','assets/media/videos/jumps/quad/sml/quad-sml.gif');
              this.refs.fallbackImg.src = 'assets/media/videos/jumps/quad/sml/quad-sml.gif';
              this.setSrc(13);
            }
          }

        }//if data



      }

 



  }


  toggleComp() {

    //toggle button set state
    //toggle off comp
    if (this.state.compButton.isSet) {
      this.setState({compButton: { id: 'comp', isSet: false, name: "Compare Jumps", class: "vid-bttn", icon: ""}});
      //just select the one most recent jump type
      this.setMostRecent();
      //stop video and put back in the poster image
      this.state.currentVid.load();
      this.state.currentVid.pause();
      //reveal play button
      removeClass(this.refs.vidPlayControl, 'hidden');
    } 
    //toggle on comp
    else {
      this.setState({compButton: { id: 'comp', isSet: true, name: "Compare Jumps", class: "vid-bttn", icon: ""}});
    }

  }

  setMostRecent() {
    //if two buttons selected, reset to just the most recet one..
    //unselect all buttons first
    let buttonsCopy = _.clone(this.state.jumpButtons);
    buttonsCopy.map((item) => {
      item.isSet = false;
    });
    //reselect the most recent button selected
    let recentButton = this.state.recentJumpButton;
    let recentItem = _.find(this.state.jumpButtons, function(item){ return item.id === recentButton; });
    if(recentItem) {
      recentItem.isSet = true;
    }
  }

  setJumpType(id, e) {

    //if comp button not selected only allow 1 button to be selected
    if(!this.state.compButton.isSet) {
      //select the jump button
      let buttonsCopy = _.clone(this.state.jumpButtons);
      this.setButton(id, this.state.jumpButtons);
      this.setState({jumpButtons: buttonsCopy});
    }
    //if comp button selected, allow two buttons to be selected
    else {

      //find all selcted jump types
      var data = _.filter(this.state.jumpButtons, function(item){
        return item.isSet === true;
      });

      //if less than two selected
      if(data.length < 2) {
        //update the button to selected
        var currentItem = _.find(this.state.jumpButtons, function(item){ return item.id === id; });
        currentItem.isSet = true;
        this.forceUpdate();
      } else {
        //select the current button...
        this.setButton(id, this.state.jumpButtons);

        //and reselect the most recent button selected
        let recentButton = this.state.recentJumpButton;
        let recentItem = _.find(this.state.jumpButtons, function(item){ return item.id === recentButton; });
        recentItem.isSet = true;

      }

    }
    //set most recent jump type button selected
    this.setState({recentJumpButton: id});

    //play the video
    this.playVid();

  }

  setButton(id, buttonSet) {
    //unselect all buttons first
    buttonSet.map((item) => {
      item.isSet = false;
    });
    //update the button to selected
    var data = _.find(buttonSet, function(item){ return item.id == id; });
    data.isSet = true;
  }

  setSrc(n) {

    var v = new Array();

    //single selection
    v[0] = [
            "assets/media/videos/jumps/single/lrg/single-lrg-onion.webm",
            "assets/media/videos/jumps/single/lrg/single-lrg-onion.mp4"
            ];
    v[1] = [
            "assets/media/videos/jumps/double/lrg/double-lrg-onion.webm",
            "assets/media/videos/jumps/double/lrg/double-lrg-onion.mp4"
            ];
    v[2] = [
            "assets/media/videos/jumps/triple/lrg/triple-lrg-onion.webm",
            "assets/media/videos/jumps/triple/lrg/triple-lrg-onion.mp4"
            ];
    v[3] = [
            "assets/media/videos/jumps/quad/lrg/quad-lrg-onion.webm",
            "assets/media/videos/jumps/quad/lrg/quad-lrg-onion.mp4"
            ];

            //comp selection
    v[4] = [
            "assets/media/videos/combos/combos1-2.webm",
            "assets/media/videos/combos/combos1-2.mp4"
            ];
    v[5] = [
            "assets/media/videos/combos/combos1-3.webm",
            "assets/media/videos/combos/combos1-3.mp4"
            ];
    v[6] = [
            "assets/media/videos/combos/combos1-4.webm",
            "assets/media/videos/combos/combos1-4.mp4"
            ];
    v[7] = [
            "assets/media/videos/combos/combos2-3.webm",
            "assets/media/videos/combos/combos2-3.mp4"
            ];
    v[8] = [
            "assets/media/videos/combos/combos2-4.webm",
            "assets/media/videos/combos/combos2-4.mp4"
            ];
    v[9] = [
            "assets/media/videos/combos/combos3-4.webm",
            "assets/media/videos/combos/combos3-4.mp4"
            ];
            //single slection (mobile)
    v[10] = [
            "assets/media/videos/jumps/single/sml/single-sml.webm",
            "assets/media/videos/jumps/single/sml/single-sml.mp4"
            ];
    v[11] = [
            "assets/media/videos/jumps/double/sml/double-sml.webm",
            "assets/media/videos/jumps/double/sml/double-sml.mp4"
            ];
    v[12] = [
            "assets/media/videos/jumps/triple/sml/triple-sml.webm",
            "assets/media/videos/jumps/triple/sml/triple-sml.mp4"
            ];
    v[13] = [
            "assets/media/videos/jumps/quad/sml/quad-sml.webm",
            "assets/media/videos/jumps/quad/sml/quad-sml.mp4"
            ];


    
    // console.log('Modernizr.video: ', Modernizr.video);
    // console.log('Modernizr.video.webm: ', Modernizr.video.webm);
    // console.log('Modernizr.video.ogg: ', Modernizr.video.ogg);
    // console.log('Modernizr.video.h264: ', Modernizr.video.h264);

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

    //this.state.currentVid.setAttribute('poster','');

    this.state.currentVid.load();
    this.state.currentVid.play();

    //fade in video
    var tl = new TimelineLite();
    tl
      .to(this.state.currentVid, 0.5, {autoAlpha: 1}, 0.4);

  }

  checkIsMobile() {

      //if not mobile
      if (browser.width >= 1024) {
        if(this.isMobile === true) {
          this.isMobile = false;

          if(this.state.currentVid) {
            //set poster of correct size
            this.state.currentVid.setAttribute('poster','assets/img/poster-video-app-lg.jpg');
          }

        }

      } 
      //if mobile
      else {
        if(this.isMobile === false) {
          this.isMobile = true;

          if(this.state.currentVid) {
            //set poster of correct size
            this.state.currentVid.setAttribute('poster','assets/img/poster-video-app-sml.jpg');
          }

          //disable comp button
          this.setState({compButton: { id: 'comp', isSet: false, name: "Compare Jumps", class: "vid-bttn", icon: ""}});

          //set buttons to only most recent ones
          this.setMostRecent();
          //if no most recent buttons selecte, just select the firt one
          if(!this.state.recentJumpButton) {
            this.setButton(this.state.jumpButtons[0].id, this.state.jumpButtons);
          }
          this.forceUpdate();
        }
    }
  }


  renderJumpButtons() {
    return this.state.jumpButtons.map((item) => {
      return (
          <ButtonComponent
            key={item.id}
            name={item.name} 
            onClickProp={this.setJumpType.bind(this, item.id)}
            //isActive={item.isSet ? "active" : ""}
            isActive={item.isSet ? 'active' : ''}
            classProp={"vid-bttn button"}
            icon={item.icon}
          />
        )
    });
  }



  // <button className="play-button" onClick={this.playVid.bind(this)}>play</button>

  render() {
          return (
            <div className={`video-app ${this.props.classProp}`} >
              
                <video
                    className="video-player"
                    ref={'largeConent1'}
                    muted 
                    playsInline
					          poster="assets/img/poster-video-app-lg.jpg">
                    >
                    <img ref={'fallbackImg'} src="" title="Your browser does not support the <video> tag"/>
                </video>
                <a ref="vidPlayControl" onClick={this.onVidBtnClick.bind(this)} className="video-control paused">
                  <span className="play-icon"></span>
                </a>

                <div className='vid-buttons row expanded'>


                <div className="column small-12 medium-12 large-5 large-offset-1 ">
                  <div className="expanded button-group">
                  {this.renderJumpButtons()}
                  </div>
                </div>

                <div className="column show-for-large large-4 large-offset-1 text-right">
                    <ButtonComponent
                    name={this.state.compButton.name}
                    onClickProp={this.toggleComp.bind(this)}
                    //isActive={item.isSet ? "active" : ""}
                    isActive={this.state.compButton.isSet ? 'active' : ''}
                    classProp={"button right-button"}
                    icon={this.state.compButton.icon}
                    />
                </div>

               </div>
            </div>


            )
      }

}


function mapStateToProps(state) {
  return {
    //redux state
  }
}
      
export default connect(mapStateToProps)(Page2);
