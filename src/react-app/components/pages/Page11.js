import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//utils
//import { toggle } from '../../lib/utils'
//components
import Portal from '../Portal';

//actions
import { changeNavDisabled } from '../../actions/nav';

//utils
import Pubsub from 'pubsub-js';
import {store} from '../../app';
import watch from 'redux-watch';
import { CustomEvent } from '../../lib/utils'
var browser = require('browser-size')();


class Page11 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      //state: state,
      // allLoaded: false
    }
    //this.isMobile = false;
    this.LoadSceneEvent = null;
    this.UnloadSceneEvent = null;
    this.loadSceneEventParams = null;
  }

  componentWillMount() {

    if(browser.width > 1200) {
      //this.isMobile = false;
      this.loadSceneEventParams = { bubbles: false, cancelable: false, detail: { isMobile: false } };
    } else {
      //this.isMobile = true;
      this.loadSceneEventParams = { bubbles: false, cancelable: false, detail: { isMobile: true } };
    }
    
  }

  componentDidMount() {

    //call to unload scene if navigation away from this page
    // watch for page change in root store
    let w = watch(store.getState, 'currentPages')
    store.subscribe(w((newVal, oldVal, objectPath) => {
      if(newVal[0] === this.props.currentPages[1]) {
        this.unloadScene();
      }
    }))

    //notify component starting to load
    this.props.onPageStarting();

    // subscribe to ViewInternal to only load scene when css nav transition has finished
    this.pubsub_token = Pubsub.subscribe('loadThreeScene', this.loadScene.bind(this));
    // this.loadScene();

    //setup events
    this.LoadSceneEvent = CustomEvent("loadScene", this.loadSceneEventParams);

    //listen for when three scene is loaded
    window.addEventListener("sceneLoaded", this.onSceneLoaded.bind(this));

    // unload three scene custom event
    this.UnloadSceneEvent = CustomEvent("unloadScene");

  }

  componentWillUnmount() {

    //remove 
    Pubsub.unsubscribe(this.pubsub_token);
    window.removeEventListener("sceneLoaded", this.onSceneLoaded.bind(this));
    this.LoadSceneEvent = null;
    this.UnloadSceneEvent = null;
    this.loadSceneEventParams = null;
  }

  loadScene(topic) {

    //disable the nav while scene loading
    this.props.dispatch(changeNavDisabled(true));

    // Dispatch loadScene event on scene element
    window.dispatchEvent(this.LoadSceneEvent);


  }


  onSceneLoaded() {

    //call to parent all content loaded
    this.props.onPageLoadComplete();
    //re-enable the nav
    this.props.dispatch(changeNavDisabled(false));

  }


  unloadScene() {

    // Dispatch custom event on scene element
    if(this.UnloadSceneEvent) {
      window.dispatchEvent(this.UnloadSceneEvent);
    }
    
  }

  //we've stopped the render tree
  render() {
      //open the portal by rendering nothing that will ever change
      return null;
    }

  }

  function mapStateToProps(state) {
    return {
    currentPages: state.currentPages
  }
}

export default connect(mapStateToProps)(Page11);
