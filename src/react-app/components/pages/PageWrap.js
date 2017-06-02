import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//pages
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';


class PageWrap extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      loading: false
    }

    //select from a list of components
    this.components = {
      Page1,
      Page2,
      Page3
    }

  }


  createLoadAnim({target}) {

    let tl = new TimelineLite();
    tl
      //fade out
      .to(this.refs.loader, 0.3, {autoAlpha: 1})
  }


  loadOutAnimDone() {
    this.setState({loading: false});
  }

  onPageStarting() {

    //page starting up
    //start wrap load animation
    if(!this.state.loading) {
      //fade out
      let tl = new TimelineLite();
      tl
        .to(this.refs.loader, 0.3, {autoAlpha: 1});
      this.setState({loading: true});
    }
    
  }

  onPageLoadComplete() {

    //when page is finished loaded...
    //first cancel the original animation
    this.setState({loading: false});
    //then trigger the off page wrap animation
    let tl = new TimelineLite({onComplete: this.loadOutAnimDone.bind(this)})
      //fade out
      .to(this.refs.loader, 0.3, {autoAlpha: 0})
  }

  //note that the page loading animation for initial page refresh/load happens on the actual html page.
  //below is page loading animation for indavidual combonents pages
  render() {

          //assign the component we want to use
          //ReactCSSTransitionGroup needs key even if just one item
          const SpecificComponent = this.components[this.props.pageComponent];

          return (
            <div className={`page-wrapper ${this.props.wrappedPage}`}>
              {(this.props.currentPages[0] === this.props.wrappedPage || this.props.currentPages[1] === this.props.wrappedPage)  &&
              <div>

               <div name="loader-bg" className="loader-bg">
                  <div ref="loader" name="loader" className="loader">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>

              <SpecificComponent key={1} onPageLoadComplete={this.onPageLoadComplete.bind(this)} onPageStarting={this.onPageStarting.bind(this)} />
                
              </div>
            }
            </div>

          )
      }
}

//{React.cloneElement(this.props.children, { onPageLoadComplete: this.onPageLoadComplete.bind(this), onPageStarting: this.onPageStarting.bind(this) })}

function mapStateToProps(state) {
  return {
    currentPages: state.currentPages
  }
}
      
export default connect(mapStateToProps)(PageWrap);
