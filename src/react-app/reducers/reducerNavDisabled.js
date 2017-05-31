import * as actionTypes from '../actions/types';

export default function reducerNavDisabled (state = false, action) {
    
    switch (action.type) {

        case actionTypes.NAV_DISABLED:

            return action.payload;

        default:

            return state;

    }

}