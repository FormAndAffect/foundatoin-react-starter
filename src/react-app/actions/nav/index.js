import * as actionTypes from '../types';

export function changeNav(id, isSet) {
    return {
        type: actionTypes.NAV,
        idPayload: id,
        isSetPayload: isSet
    }
}