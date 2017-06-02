import * as actionTypes from '../types';
import _ from 'lodash';
//import current pages data object list
import pages from '../../data/pages'


export function changeNav(id, isSet) {

	let pagesCopy = _.cloneDeep(pages);

	//find the object with the incoming id
	var data = _.find(pagesCopy, function(item){ return item.id == id; });

	if(data) {
		//set it to true or false
		data.isSet = isSet;

		var index = _.indexOf(pagesCopy, _.find(pagesCopy, {id: id}));

		//Replace item at index using native splice
		pagesCopy.splice(index, 1, data);
		
	}
	else {

		console.log('error getting pages data');
	}

    return {
        type: actionTypes.NAV,
        payload: pagesCopy,
    }
}

export function changeIsTransitioning(isTransitioning) {

	return {
		type: actionTypes.IS_TRANSITIONING,
		payload: isTransitioning
	}

}

export function changeScrollPages(currentPage) {

	let pagesCopy = _.cloneDeep(pages);

	//find next, prev. item in the array
	let nextItem = '';
	let prevItem = '';
	let index = 0;


	//index = pagesCopy.indexOf(currentPage);
	index = _.indexOf(pagesCopy, _.find(pagesCopy, {id: currentPage}));

	if(index >= 0) {
		//need -1 since index uses 0 index and length doesn't
		if(index !== pagesCopy.length - 1) {
			nextItem = pagesCopy[index + 1].id;
		} else {
			nextItem = '';
		}
		if(index !== 0) {
			prevItem = pagesCopy[index - 1].id;
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

	let pagesCopy = _.cloneDeep(pages);

	//find out if toPage is above or below prevPage in the pages array
	let prevPageIndex = _.indexOf(pagesCopy, _.find(pagesCopy, {id: prevPage}));
	let toPageIndex = _.indexOf(pagesCopy, _.find(pagesCopy, {id: toPage}));

	let pageDir = (prevPageIndex < toPageIndex) ? 'down' : 'up';

	return {
		type: actionTypes.NAV_DIRECTION,
		payload: pageDir
	}

}

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