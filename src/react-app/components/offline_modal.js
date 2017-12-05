import { connect } from 'react-redux';
import React, { Component } from 'react';
import Modal from './modal';
import { bindActionCreators } from 'redux';
import { isOnline } from '../actions/isOnline';

class OfflineModal extends Component {

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

  componentDidUpdate(prevProps, prevState) {
    if(this.props.online !== prevProps.online) {
      //if offline, open model, then close after a few seconds.
      if(!this.props.online) {
        this.refs.modal.openModal();
        setTimeout(() => {
          this.refs.modal.close();
        }, 1500);
      }
    }
  }

  render() {
    return (
      <Modal ref="modal" modalClass="offline-modal portal">
        <div className="portal-inner offline-message">
          You are currently offline
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    online: state.isOnline.online
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    isOnline: isOnline,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineModal);
