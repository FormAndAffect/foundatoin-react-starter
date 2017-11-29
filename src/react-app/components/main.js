import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div>
				reducer test: {this.props.test} <br/>
				<Link to="/page-id" >page link</Link>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		test: state.test.test
	}
}

export default connect(mapStateToProps)(Main);