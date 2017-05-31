import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
//import { refsToArray } from '../../lib/utils';
import GSAP from 'react-gsap-enhancer';



class Page13 extends Component {

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
    let willShow = target.find({name: 'willShow'});

    //just fade in the page
    return new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
      .set(willShow, {autoAlpha: 0, scale:0.7})
      .to(page, 0.5, {autoAlpha: 1}, 0.5)
      .to(willShow, 0.3, {autoAlpha: 1, scale:1})

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
                  <section name="section" className="page-content slide quote row expanded align-middle align-center">
                    <div name="willShow" className="small-10 medium-8 large-6 text-center will-reveal">
                      <blockquote>The quad is the physical limit, to do a quint, we would have to have somebody built like a pencil, and they can't get much smaller than they already are.</blockquote>
                      <cite className="fromLeft">James Richards<span>BIOMECHANIST, UNIVERSITY OF DELAWARE</span>
			  		  <a target="_blank" href="https://www.scientificamerican.com/article/is-the-quintuple-jump-in-figure-skating-physically-possible/">(Source: Scientific American)</a>
			  		</cite>
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
      
export default connect(mapStateToProps)(GSAP()(Page13));
