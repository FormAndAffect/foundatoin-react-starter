import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import OffLineModal from './offline_modal';
import { isOnline } from '../actions/isOnline';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentWillMount() {
	  // tell users that they are offline/online (event)
	  const that = this;
	  window.addEventListener('load', function() {
	    function updateOnlineStatus(event) {
	      var condition = navigator.onLine ? "online" : "offline";

	      if(condition == 'offline') {
	       $('body').addClass('offline');
	       that.props.isOnline(false);
	      } else {
	       $('body').removeClass('offline');
	       that.props.isOnline(true);
	      }
	    }

	    window.addEventListener('online',  updateOnlineStatus);
	    window.addEventListener('offline', updateOnlineStatus);
	  });
	}

	render() {
		return (
			<div className={`main`}>
				online? : {this.props.online ? 'yes' : 'no'} <br/>
				<Link to="/page-id" >page link</Link>
				<OffLineModal/>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		online: state.isOnline.online,
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    isOnline: isOnline,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);