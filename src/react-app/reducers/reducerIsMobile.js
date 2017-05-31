import * as actionTypes from '../actions/types';

export default function reducerIsMobile (state = false, action) {
    
    switch (action.type) {

        case actionTypes.IS_MOBILE:

            return action.payload;

        default:

            return state;

    }

}