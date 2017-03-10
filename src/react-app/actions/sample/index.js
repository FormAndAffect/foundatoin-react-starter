import * as actionTypes from '../types';

export function changeSample(payload) {
	return {
		type: actionTypes.SAMPLE_TYPE,
		payload: payload
	}
}