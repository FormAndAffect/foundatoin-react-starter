import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import enableInlineVideo from 'iphone-inline-video';
import {removeClass, addClass} from '../../lib/utils'
import VideoApp from '../VideoApp';

//utils
//import { refsToArray } from '../../lib/utils';
import GSAP from 'react-gsap-enhancer';
//import gsap from 'gsap';



class Page4 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false,
    }

  }

  componentWillMount() {
  }

  componentDidMount() {

    //notify component starting to load (for wrapper loading animation)
    this.props.onPageStarting();

  }

  componentDidMount() {
    //notify component starting to load
    this.props.onPageStarting();
    //start fadein animation
    this.controller = this.addAnimation(this.createPageAnim.bind(this));
    this.setState({allLoaded: true})
  }


  createPageAnim({target}) {

    //get the elements
    let page = target.find({name: 'section'});

    //just fade in the page
    return new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
      .to(page, 0.5, {autoAlpha: 1}, 1.0);

    //kill all animations on component
    this.controller.kill();
  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }

  onVideoAppLoaded(e) {

    if(!this.state.allLoaded) {

      this.controller = this.addAnimation(this.createPageAnim.bind(this));

      // //get the elements
      // let page = target.find({name: 'section'});

      // //just fade in the page
      // let tl = new TimelineLite({onComplete: this.pageAnimComplete.bind(this)});
      //   tl
      //     .to(this.refs.section, 0.3, {autoAlpha: 1});

      this.setState({allLoaded: true});
    }

  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }

  // <source src="assets/media/videos/hero.webm" type="videos/webm"/>
  // <source src="assets/media/videos/hero.mp4" type="videos/mp4"/>

  render() {
          return (
                <div>
                   <section name="section" className="page-content slide vid-compare">
                      <VideoApp handleLoaded={this.onVideoAppLoaded.bind(this)} />
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
      
export default connect(mapStateToProps)(GSAP()(Page4));
