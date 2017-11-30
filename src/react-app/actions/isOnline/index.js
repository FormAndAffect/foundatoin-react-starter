import {
	IS_ONLINE,
} from '../types';

//views

export function isOnline(isOnline) {
	return {
		type: IS_ONLINE,
		payload: isOnline
	}
}