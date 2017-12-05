import React, { Component } from 'react';
import OffLineModal from './offline_modal';

// note: this can't be a redux component
// since it wraps the rect-router Switch.
// if it is then child compoonents won't update on change route

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className={`main`}>
				{this.props.children}
				<OffLineModal/>
			</div>
			)
	}
}


export default Main;