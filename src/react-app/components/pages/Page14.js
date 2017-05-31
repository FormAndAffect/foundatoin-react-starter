import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
//import { refsToArray } from '../../lib/utils';
import GSAP from 'react-gsap-enhancer';



class Page14 extends Component {

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
    this.controller = this.addAnimation(this.createPageAnim.bind(this));
    this.setState({allLoaded: true})
  }


  createPageAnim({target}) {

    //get the elements
    let page = target.find({name: 'section'});
    let subHeading = target.find({name: 'subHeading'});
    let heading = target.find({name: 'heading'});
    let restContent = target.find({name: 'restContent'});

    //just fade in the page
    return new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
      .to(page, 0.5, {autoAlpha: 1}, 1)
      .to(subHeading, 0.5, {autoAlpha: 0.8}, "-=0.3")
      .to(heading, 0.5, {autoAlpha: 0.8}, "-=0.3")
      .to(restContent, 0.5, {autoAlpha: 0.8}, "-=0.3");

    //kill all animations on component
    this.controller.kill();
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
                  <section name="section" className="page-content slide row expanded align-middle align-center">
                    <div className="small-10 medium-8 large-6 text-center">
              			  <h2 name="subHeading" className="will-move">Catch all the figure skating action on</h2>
              			  <img name="heading" className="will-move" src="assets/img/cbc-sports-red.svg" alt="CBC Sports"/>
              			  <br/>
                      <div name="restContent" className="will-move">
                			  <a target="_blank" href="http://www.cbc.ca/sports/olympics/winter/figureskating" className="button">view now</a>
                			  
                      </div>
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
      
export default connect(mapStateToProps)(GSAP()(Page14));
