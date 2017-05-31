import * as actionTypes from '../actions/types';

export default function reducerMediaSize (state = '', action) {
    
    switch (action.type) {

        case actionTypes.MEDIA_SIZE:

            return action.payload;

        default:

            return state;

    }

}