import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
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

    //fade in the page then quad titles
    let tl = new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
    tl
      .to(this.refs.section, 0.5, {autoAlpha: 1}, 1.0)
      .to(this.refs.heading, 0.5, {autoAlpha: 0.8}, "-=0.3");

    tl = null;
  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();
  }


  render() {
          return (
                <div>
                   <section ref="section" name="section" className="page-content slide hero row expanded align-middle align-center">
                    <div className="small-10 medium-8 columns large-6 text-center">
                      <h1 ref="heading" name="heading">Main Title!!</h1>
                      <p>Some filler text...</p> 
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
      
//export default connect(mapStateToProps)(GSAP()(Page1));
export default connect(mapStateToProps)(Page1);
