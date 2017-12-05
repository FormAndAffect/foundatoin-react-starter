import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				Home<br/>
				<Link to="/my-page-id" >page link</Link>
			</div>
			)
	}
}

export default Page;