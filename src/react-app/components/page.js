import React, { Component } from 'react';
import connect from 'react-redux';

class Page extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>pageId: {this.props.match.params.id}</div>
			)
	}
}

export default Page;