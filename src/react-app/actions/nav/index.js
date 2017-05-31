import * as actionTypes from '../types';
import _ from 'lodash';
//import current pages data object list
import pages from '../../data/pages'


export function changeNav(id, isSet) {

    return {
        type: actionTypes.NAV,
        idPayload: id,
        isSetPayload: isSet
    }
}

export function changePath(currentPath) {
	return {
		type: actionTypes.PATH,
		payload: currentPath
	}
}

export function changeIsTransitioning(isTransitioning) {

	return {
		type: actionTypes.IS_TRANSITIONING,
		payload: isTransitioning
	}

}

export function changeScrollPages(currentPage) {

	let pagesCopy = _.clone(pages);

	//find next, prev. item in the array
	let nextItem = '';
	let prevItem = '';
	let index = 0;
	index = pagesCopy.indexOf(currentPage);
	if(index >= 0) {
		//need -1 since index uses 0 index and length doesn't
		if(index !== pagesCopy.length - 1) {
			nextItem = pagesCopy[index + 1];
		} else {
			nextItem = '';
		}
		if(index !== 0) {
			prevItem = pagesCopy[index - 1];
		} else {
			prevItem = '';
		}
	}

	let currentPages = [prevItem, currentPage, nextItem];

	return {
		type: actionTypes.SCROLL_PAGES,
		payload: currentPages
	}
}

export function calcNavDirection(prevPage, toPage) {

	let pagesCopy = _.clone(pages);

	//find out if toPage is above or below prevPage in the pages array
	let prevPageIndex = pagesCopy.indexOf(prevPage);
	let toPageIndex = pagesCopy.indexOf(toPage);

	let pageDir = (prevPageIndex < toPageIndex) ? 'down' : 'up';

	return {
		type: actionTypes.NAV_DIRECTION,
		payload: pageDir
	}

}

// export function calcEndPages() {

// 	//fix this later
// 	//let pagesCopy = _.clone(pages);
// 	//find page
// 	// let firstPage = pagesCopy[0];
// 	// let lastPage = pagesCopy.indexOf(pagesCopy.length);
// 	let endPages = ['index', 'quint'];

// 	return {
// 		type: actionTypes.END_PAGES,
// 		payload: endPages
// 	}

// }

export function changeCurrentPages(currentPages) {

	return {
		type: actionTypes.CURRENT_PAGES,
		payload: currentPages
	}
}

export function changeNavDisabled(isDisabled) {

	return {
		type: actionTypes.NAV_DISABLED,
		payload: isDisabled
	}
}