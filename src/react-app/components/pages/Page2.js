import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
import gsap from 'gsap';



class Page2 extends Component {

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
      .set(this.refs.willShow, {autoAlpha: 0, scale:0.7})
      .to(this.refs.section, 0.5, {autoAlpha: 1}, 0.5)
      .to(this.refs.willShow, 0.3, {autoAlpha: 1, scale:1})

    tl = null;
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


  render() {
          return (
                <div>
                  <section ref="section" className="page-content slide quote row expanded align-middle align-center">
                    <div ref="willShow" className="small-10 medium-8 large-6 text-center will-reveal">
                      <blockquote>When they fall on a jump like that, some say it feels like their intestines end up in their throat.</blockquote>
                      <cite className="fromLeft">Tom Zakrajsek<span>WORLD AND OLYMPIC FIGURE-SKATING COACH</span>
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
      
export default connect(mapStateToProps)(Page2);
