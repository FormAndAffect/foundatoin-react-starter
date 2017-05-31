import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//utils
//import { refsToArray } from '../../lib/utils';
import GSAP from 'react-gsap-enhancer';



class Page12 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      allLoaded: false
    }

    this.contentToLoad = 0;
    this.contentLoaded = 0;
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
                  <section name="section" className="page-content slide row expanded align-middle">
                    
			      <div className="show-for-large large-3 first">
			  		<div className="title show-for-large">
					  <span>First</span>
					  <span>in competition</span>
					  <span>quads</span>
					</div>
			  <img src="assets/img/first.svg" alt="Competition firsts"/>
			  	  </div>
			  	
			  	<div className="small-offset-1 medium-7 medium-offset-1">
			  
			  <div className="title hide-for-large">
			  <span>First</span>
			  <span>in competition</span>
			  <span>quads</span>
			  </div>
			  
				<div className="timeline">
			  				<div className="timeline-block toeloop">
							  <h3>Toe Loop</h3>
							  <img src="assets/img/flag-canada.svg" alt="Canadian flag"/>
							  <div className="year">1988</div>
							  <div className="timeline-info">
							  <div className="name">Kurt Browning</div>
							  <div className="event">World Championships</div>
							  </div>
						  </div>
						  <div className="timeline-block salchow">
							  <h3>Salchow</h3>
							  <img src="assets/img/flag-usa.svg" alt="USA flag"/>
							  <div className="year">1998</div>
							  <div className="timeline-info">
							  <div className="name">Timothy Goebel</div>
							  <div className="event">Junior Grand Prix Finals</div>
							  </div>
						  </div>
						  <div className="timeline-block lutz">
							  <h3>Lutz</h3>
							  <img src="assets/img/flag-usa.svg" alt="USA flag"/>
							  <div className="year">2011</div>
							  <div className="timeline-info">
							  <div className="name">Brandon Mroz</div>
							  <div className="event">Colorado Springs Invitational</div>
							  </div>
						  </div>
						  <div className="timeline-block flip">
							  <h3>Flip</h3>
							  <img src="assets/img/flag-japan.svg" alt="Japanese flag"/>
							  <div className="year">2016</div>
							  <div className="timeline-info">
							  <div className="name">Shoma Uno</div>
							  <div className="event">KOSE Team Challenge Cup</div>
							  </div>
						  </div>
						  <div className="timeline-block loop">
							  <h3>Loop</h3>
							  <img src="assets/img/flag-japan.svg" alt="Japanese flag"/>
							  <div className="year">2016</div>
							  <div className="timeline-info">
							  <div className="name">Yuzuru Hanyu</div>
							  <div className="event">Autumn Classic International</div>
							  </div>
						  </div>
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
      
export default connect(mapStateToProps)(GSAP()(Page12));
