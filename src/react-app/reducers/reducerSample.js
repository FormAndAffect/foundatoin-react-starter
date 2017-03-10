import * as actionTypes from '../actions/types';

export default function reducerSample (state = '', action) {
    
    switch (action.type) {

        case actionTypes.SAMPLE_TYPE:

            return action.payload;

        default:

            return state;

    }

}