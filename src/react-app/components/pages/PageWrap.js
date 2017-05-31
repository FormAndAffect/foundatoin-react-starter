import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
import gsap from 'gsap';




class PageWrap extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      loading: false
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
    //kill all animations on component
    //this.controller.kill();
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

  // <div name="loader-bg" className="loader-bg">
  //   <div name="loader" id="quad-loader" className="center-element">
  //     <svg id="quad" viewBox="0 0 500 163" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
  //       <path id="quad-base" d="M424.6875,100.9597 L419.3745,100.9597 L419.3745,36.8157 L425.6355,36.8157 C440.6275,36.8157 445.3735,43.8377 445.3735,67.9387 C445.3735,92.4197 440.0585,100.9597 424.6875,100.9597 L424.6875,100.9597 Z M302.7855,79.3257 C305.2525,66.7997 307.9095,50.8587 310.5665,35.2977 L311.7055,35.2977 C314.1715,49.1507 317.9675,68.8877 319.6755,79.3257 L302.7855,79.3257 Z M70.5955,105.1347 C57.3115,105.1347 53.8955,90.9017 53.8955,68.5077 C53.8955,45.1667 58.2595,32.6407 70.2155,32.6407 C84.0695,32.6407 86.7265,45.7357 86.7265,69.4577 C86.7265,91.8507 83.1215,105.1347 70.5955,105.1347 L70.5955,105.1347 Z M429.0515,3.4157 L366.9965,3.4157 L366.9965,70.1067 L347.7615,3.4157 L278.1155,3.4157 L259.1055,71.3767 L259.1055,3.4157 L206.3475,3.4157 L206.3475,88.8137 C206.3475,97.5437 202.7425,103.2367 195.3415,103.2367 C187.1815,103.2367 183.0055,98.3027 183.0055,88.8137 L183.0055,3.4157 L130.6285,3.4157 L130.6285,31.1317 C119.9105,12.6227 100.1995,-0.0003 71.3545,-0.0003 C21.8245,-0.0003 0.0005,32.4517 0.0005,69.0777 C0.0005,105.3247 20.8755,137.7757 69.2675,137.7757 C74.5805,137.7757 79.5145,137.3967 84.2595,136.6367 L122.9725,162.6357 L146.5045,134.7387 L122.2135,118.6087 C126.8555,113.8937 130.5765,108.3977 133.4095,102.3327 C140.3425,126.2957 160.3505,137.7757 194.2035,137.7757 C216.7335,137.7757 234.0215,132.7057 245.0755,121.5377 L241.4885,134.3597 L291.9685,134.3597 L296.3335,113.8637 L326.8865,113.8637 L331.2515,134.3597 L366.9965,134.3597 L385.5275,134.3597 L429.8115,134.3597 C477.0645,134.3597 499.4585,105.1347 499.4585,67.9387 C499.4585,32.0717 476.6855,3.4157 429.0515,3.4157 L429.0515,3.4157 Z"></path>
  //       <path id="quad-line-animation" d="M424.6875,100.9597 L419.3745,100.9597 L419.3745,36.8157 L425.6355,36.8157 C440.6275,36.8157 445.3735,43.8377 445.3735,67.9387 C445.3735,92.4197 440.0585,100.9597 424.6875,100.9597 L424.6875,100.9597 Z M302.7855,79.3257 C305.2525,66.7997 307.9095,50.8587 310.5665,35.2977 L311.7055,35.2977 C314.1715,49.1507 317.9675,68.8877 319.6755,79.3257 L302.7855,79.3257 Z M70.5955,105.1347 C57.3115,105.1347 53.8955,90.9017 53.8955,68.5077 C53.8955,45.1667 58.2595,32.6407 70.2155,32.6407 C84.0695,32.6407 86.7265,45.7357 86.7265,69.4577 C86.7265,91.8507 83.1215,105.1347 70.5955,105.1347 L70.5955,105.1347 Z M429.0515,3.4157 L366.9965,3.4157 L366.9965,70.1067 L347.7615,3.4157 L278.1155,3.4157 L259.1055,71.3767 L259.1055,3.4157 L206.3475,3.4157 L206.3475,88.8137 C206.3475,97.5437 202.7425,103.2367 195.3415,103.2367 C187.1815,103.2367 183.0055,98.3027 183.0055,88.8137 L183.0055,3.4157 L130.6285,3.4157 L130.6285,31.1317 C119.9105,12.6227 100.1995,-0.0003 71.3545,-0.0003 C21.8245,-0.0003 0.0005,32.4517 0.0005,69.0777 C0.0005,105.3247 20.8755,137.7757 69.2675,137.7757 C74.5805,137.7757 79.5145,137.3967 84.2595,136.6367 L122.9725,162.6357 L146.5045,134.7387 L122.2135,118.6087 C126.8555,113.8937 130.5765,108.3977 133.4095,102.3327 C140.3425,126.2957 160.3505,137.7757 194.2035,137.7757 C216.7335,137.7757 234.0215,132.7057 245.0755,121.5377 L241.4885,134.3597 L291.9685,134.3597 L296.3335,113.8637 L326.8865,113.8637 L331.2515,134.3597 L366.9965,134.3597 L385.5275,134.3597 L429.8115,134.3597 C477.0645,134.3597 499.4585,105.1347 499.4585,67.9387 C499.4585,32.0717 476.6855,3.4157 429.0515,3.4157 L429.0515,3.4157 Z"></path>
  //     </svg>
  //   </div>
  // </div>


  render() {

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

                {React.cloneElement(this.props.children, { onPageLoadComplete: this.onPageLoadComplete.bind(this), onPageStarting: this.onPageStarting.bind(this) })}
              </div>
            }
            </div>

            )
      }
}

function mapStateToProps(state) {
  return {
    currentPages: state.currentPages
  }
}
      
export default connect(mapStateToProps)(PageWrap);
