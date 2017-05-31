import * as actionTypes from '../types';

export function changeMediaSize(size) {
	return {
		type: actionTypes.MEDIA_SIZE,
		payload: size
	}
}

export function changeIsMobile(isMobile) {
	return {
		type: actionTypes.IS_MOBILE,
		payload: isMobile
	}
}
	