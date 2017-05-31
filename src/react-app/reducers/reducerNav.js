import _ from 'lodash';
import * as actionTypes from '../actions/types';
var browser = require('browser-size')();


//set initial data for the profession setp
let INITIAL_STATE = [];

if(browser.width > 1200) {
	//enable three scene
	INITIAL_STATE = [
		{ id: 'index', isSet: false, name: "01", class: "nav-link", icon: ""},
		{ id: 'pursuit', isSet: false, name: "02", class: "nav-link", icon: "" },
		{ id: 'psychology', isSet: false, name: "03", class: "nav-link", icon: "" },
		{ id: 'jumps', isSet: false, name: "04", class: "nav-link", icon: "" },
		{ id: 'height', isSet: false, name: "05", class: "nav-link", icon: "" },
		{ id: 'hangtime', isSet: false, name: "06", class: "nav-link", icon: "" },
		{ id: 'rotation', isSet: false, name: "07", class: "nav-link", icon: "" },
		{ id: 'landing', isSet: false, name: "08", class: "nav-link", icon: "" },
		{ id: 'perspective', isSet: false, name: "09", class: "nav-link", icon: "" },
		{ id: 'stages', isSet: false, name: "10", class: "nav-link", icon: "" },
		{ id: 'anatomy', isSet: false, name: "11", class: "nav-link", icon: "" },
		{ id: 'firsts', isSet: false, name: "12", class: "nav-link", icon: "" },
		{ id: 'quint', isSet: false, name: "13", class: "nav-link", icon: "" },
		{ id: 'promo', isSet: false, name: "14", class: "nav-link", icon: "" },
	]
} else {
	INITIAL_STATE = [
		{ id: 'index', isSet: false, name: "01", class: "nav-link", icon: ""},
		{ id: 'pursuit', isSet: false, name: "02", class: "nav-link", icon: "" },
		{ id: 'psychology', isSet: false, name: "03", class: "nav-link", icon: "" },
		{ id: 'jumps', isSet: false, name: "04", class: "nav-link", icon: "" },
		{ id: 'height', isSet: false, name: "05", class: "nav-link", icon: "" },
		{ id: 'hangtime', isSet: false, name: "06", class: "nav-link", icon: "" },
		{ id: 'rotation', isSet: false, name: "07", class: "nav-link", icon: "" },
		{ id: 'landing', isSet: false, name: "08", class: "nav-link", icon: "" },
		{ id: 'perspective', isSet: false, name: "09", class: "nav-link", icon: "" },
		{ id: 'stages', isSet: false, name: "10", class: "nav-link", icon: "" },
		{ id: 'anatomy', isSet: false, name: "11", class: "nav-link", icon: "" },
		{ id: 'firsts', isSet: false, name: "12", class: "nav-link", icon: "" },
		{ id: 'quint', isSet: false, name: "13", class: "nav-link", icon: "" },
		{ id: 'promo', isSet: false, name: "14", class: "nav-link", icon: "" },
	]
}

function reducerNav (state = INITIAL_STATE, action) {

	let stateCopy = [];

  switch(action.type) {

    case actionTypes.NAV:

		//make a copy of state so as to not modify it:
		stateCopy = _.cloneDeep(state);

		//copy the object at the incoming index payload
		var data = _.find(stateCopy, function(item){ return item.id == action.idPayload; });

		if(data) {
			data.isSet = action.isSetPayload;

			// Find item index using indexOf+find
			// look in to the initial state array to find the id of he passed action payload
			var index = _.indexOf(stateCopy, _.find(stateCopy, {id: action.idPayload}));
			//console.log("found index: " + index);

			// Replace item at index using native splice
			stateCopy.splice(index, 1, data);
			
			return stateCopy;
		} 
		else {

			return state;
		}


	// case actionTypes.RESET_REDUCERS:

 //    	//return initial state
 //    	return INITIAL_STATE;

    default:
    
        return state;
  }
}
export default reducerNav;