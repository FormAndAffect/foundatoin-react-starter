import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
//import { refsToArray } from '../../lib/utils';
//import GSAP from 'react-gsap-enhancer';
import gsap from 'gsap';



class Page1 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    //notify component starting to load
    this.props.onPageStarting();
    //start fadein animation
    //this.controller = this.addAnimation(this.createPageAnim.bind(this));
    this.createPageAnim();
    this.setState({allLoaded: true})
  }


  createPageAnim() {

    //get the elements
    // let page = target.find({name: 'section'});
    // let subHeading = target.find({name: 'subHeading'});
    // let heading = target.find({name: 'heading'});

    //fade in the page then quad titles
    let tl = new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
    tl
      .to(this.refs.section, 0.5, {autoAlpha: 1}, 1.0)
      .to(this.refs.subHeading, 0.5, {autoAlpha: 0.8}, "-=0.3")
      .to(this.refs.heading, 0.5, {autoAlpha: 0.8}, "-=0.3");

    tl = null;

    //kill all animations on component
    //this.controller.kill();
  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }

  //   <img
  //   ref={this.makeRef.bind(this)}
  //   src="assets/img/large.jpg"
  //   onLoad={this.handleLoaded.bind(this)}
  //   />

  // <img
  //   ref={this.makeRef.bind(this)}
  //   src="assets/img/large.jpg"
  //   onLoad={this.handleLoaded.bind(this)}
  //   />
	
	

  render() {
          return (
                <div>
                   <section ref="section" name="section" className="page-content slide hero row expanded align-middle align-center">
                    <div className="small-10 medium-8 columns large-6 text-center">
                      <span ref="subHeading" name="subHeading">Breaking Down The</span>
                      <h1 ref="heading" name="heading"><img src="assets/img/quad.svg" alt="Breaking down the Quad"/></h1>
                      <p>In March 1988, Canada’s Kurt Browning landed the first ever quadruple jump in competition at the World Championships in Hungary. Nearly 30 years later, the quad has become a key part of the program for Olympic-level men’s single skaters. A spectacular combination of artistry and raw power, the quad requires explosive strength, precise timing and an extreme degree of confidence.</p> 
          					  <img className="cbc-gem" src="assets/img/cbc-sports-white.svg" alt="CBC Sports"/>
          					  </div>
          			  		<span className="mouse"></span>
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
      
//export default connect(mapStateToProps)(GSAP()(Page1));
export default connect(mapStateToProps)(Page1);
