import * as actionTypes from '../../actions/types';
import reducerNav from '../reducerNav';
import INITIAL_STATE from '../../data/pages';

describe('Nav Reducer', () => {
	//test initial state
	it('has a default state', () => {
		//send it undefined to make it fall back to initial state
		expect(reducerNav(undefined, { type: 'unexpected' }))
		.toEqual(INITIAL_STATE);
	});
	//test can handle nav change
	let pagesData = [
		{ id: 'page1', isSet: false, name: '01', class: 'nav-link', component: 'Page1', icon: '' },
		{ id: 'page2', isSet: false, name: '02', class: 'nav-link', component: 'Page2', icon: '' },
		{ id: 'page3', isSet: false, name: '03', class: 'nav-link', component: 'Page3', icon: '' }
	];
	it('can handle nav change', () => {
		expect(reducerNav(undefined, { 
			type: actionTypes.NAV,
			payload: pagesData
		})).toEqual(pagesData);
	});
});