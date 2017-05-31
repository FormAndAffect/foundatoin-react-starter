import * as actionTypes from '../actions/types';

export default function reducerIsTransitioning (state = false, action) {
    
    switch (action.type) {

        case actionTypes.IS_TRANSITIONING:

            return action.payload;

        default:

            return state;

    }

}