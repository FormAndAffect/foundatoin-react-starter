import * as actionTypes from '../actions/types';

export default function reducerNavDirection (state = '', action) {
    
    switch (action.type) {

        case actionTypes.NAV_DIRECTION:

            return action.payload;

        default:

            return state;

    }

}