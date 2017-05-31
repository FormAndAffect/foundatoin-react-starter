import * as actionTypes from '../actions/types';

export default function reducerPath (state = '', action) {
    
    switch (action.type) {

        case actionTypes.PATH:

            return action.payload;

        default:

            return state;

    }

}