//toggle class (useful for css animations)
//---------------------------

//functions to use
export function hasClass(el, className) {
	if(el && className) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
	}
}
export function addClass(el, className) {
	if(el && className) {
		if (el.classList) el.classList.add(className);
		else if (!hasClass(el, className)) el.className += ' ' + className;
	}
}
export function removeClass(el, className) {
	if(el && className) {
		if (el.classList) el.classList.remove(className);
		else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
	}
}
export function toggle(el) {
    hasClass(el, 'is_hidden') ? removeClass(el, 'is_hidden') : addClass(el, 'is_hidden');
}
export function toggleClass(el, className) {
    hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}

//usecase:
// var el = document.querySelector('div');
// if (!hasClass(el, 'foo')) addClass(el, 'foo');

export function refsToArray(ctx, prefix){
	var results = [];
	for (var i=0;;i++){
	  var name = prefix + '-' + String(i);
	  var ref = ctx.refs[name];
	  //create an array of ref object (set loaded to false at first)
	  if (ref) results.push(ref);
	  else return results;
	}
}

//IE9/10 polyfill custom event
//use like this:
// let LoadSceneEvent = CustomEvent("sceneLoaded", { bubbles: false, cancelable: false, detail: 'my event detail' });
export function CustomEvent ( event, params ) {
	params = params || { bubbles: false, cancelable: false, detail: undefined };
	var evt = document.createEvent( 'CustomEvent' );
	evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	return evt;
}
CustomEvent.prototype = window.Event.prototype;