
//class based component boilerplate
//------------------------------------------------------------------//
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/nav';

//components
import ButtonComponent from './ButtonComponent';

class Nav extends Component {


  constructor(props) {
  super(props);
    this.state = {
      isPriority : false
    };
  }

  onOptionClick(option) {

    //reset all items first
    this.props.nav.map((item) => {
      this.props.changeNav(item.id, false);
    });

    //set the current nav item
    this.props.changeNav(option, true);

    //change route
    //http://<root-url>/#/home
    //http://<root-url>/#/internal
    hashHistory.push(`${option}`);

  }

  renderButtons() {

    let that = this;
    let buttonList = this.props.navItems.map(function(item) {
      return(
          <li key={item.id}>
            <ButtonComponent 
              name={item.name} 
              onClickProp={that.onOptionClick.bind(that, item.id)}
              isSelected={item.isSet} 
              classProp={`${item.class} option-btn`}     
              icon={item.icon}
            />
          </li>
        )
    });

    return buttonList;

  }

  render() {
    return (
      <div>
        <ul>
          {this.renderButtons()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        nav : state.nav,
    };
}

export default connect(mapStateToProps, actions)(Nav);