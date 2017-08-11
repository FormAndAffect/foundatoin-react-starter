// import _ from 'lodash';
import * as actionTypes from '../actions/types';


const INITIAL_STATE = ['', '', ''];

function reducerScrollPages(state = INITIAL_STATE, action) {
  switch(action.type) {

    case actionTypes.SCROLL_PAGES:

		return action.payload;

	// case actionTypes.RESET_REDUCERS:

 //    	//return initial state
 //    	return INITIAL_STATE;

    default:
    
        return state;
  }
}

export default reducerScrollPages;
