import * as actionTypes from '../actions/types';
import INITIAL_STATE from '../data/pages';


function reducerNav(state = INITIAL_STATE, action) {
	switch(action.type) {

		case actionTypes.NAV:

		return action.payload;                              

		default:

		return state;
	}
}
export default reducerNav;