import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addClass, removeClass } from '../../lib/utils'

//utils
//import { refsToArray } from '../../lib/utils';
import GSAP from 'react-gsap-enhancer';
// import gsap from 'gsap';



class Page3 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false,
      quoteContainer: null
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

    // TweenLite.set(quoteContainer, {class:'-=noShow'})
    // TweenLite.set(quoteContainer, {class:'+=show'});

    //just fade in the page
    return new TimelineLite({onComplete: this.pageAnimComplete.bind(this)})
      .set(willShow, {autoAlpha: 0, scale:0.7})
      .to(page, 0.5, {autoAlpha: 1}, 0.5)
      .to(willShow, 0.3, {autoAlpha: 1, scale:1})
      //.insert(TweenLite.set(quoteContainer, {className:'-=noShow'}))
      //.insert(TweenLite.set(quoteContainer, {className:'+=show'}), "+=1")
    // .to(quoteContainer, 0.5, {autoAlpha: 1});
    // TweenLite.set(quoteContainer, {class:'-=noShow'})
    // TweenLite.set(quoteContainer, {class:'+=show'});

    // removeClass(this.refs.quoteContainer, 'noShow');
    // addClass(this.refs.quoteContainer, 'show');

    //kill all animations on component
    this.controller.kill();
  }

  pageAnimComplete() {
    //call to parent all content loaded
    this.props.onPageLoadComplete();

    //animate the quote container

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
                      <blockquote>There are quite a few skaters doing them, but only a few doing them ALL. The quads are back to being a make-or-break factor in the men’s event.</blockquote>
                      <cite className="fromLeft">Kurt Browning<span>Olympian &amp; 4X WORLD CHAMPION</span></cite>
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
      
export default connect(mapStateToProps)(GSAP()(Page3));
