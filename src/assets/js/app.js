;'use strict';
//load foundation plugins - keep this
$(document).foundation();

(function() {
	//preloader
	document.addEventListener("DOMContentLoaded", function(e) {
		//fade it away on page fully loaded
		TweenLite.set(".loader-initial", { css: {className:"+=is_active", autoAlpha: 1} });
		TweenMax.to(".loader-initial", 0.5, {className:"-=is_active", autoAlpha: 0}, 1);
	});

})();

