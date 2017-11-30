'use strict';

//config
const env = process.env.NODE_ENV || "development";
import $ from 'jquery';
window.$ = $;

(function() {
	/* ==========================================================================
	// register service worker
	========================================================================== */

	/* eslint-env browser */
	'use strict';

	if ('serviceWorker' in navigator) {
	  // Your service-worker.js *must* be located at the top-level directory relative to your site.
	  // It won't be able to control pages unless it's located at the same level or higher than them.
	  // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
	  // See https://github.com/slightlyoff/ServiceWorker/issues/468
	  navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
	    // updatefound is fired if service-worker.js changes.
	    reg.onupdatefound = function() {
	      // The updatefound event implies that reg.installing is set; see
	      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
	      var installingWorker = reg.installing;

	      installingWorker.onstatechange = function() {
	        switch (installingWorker.state) {
	          case 'installed':
	            if (navigator.serviceWorker.controller) {
	              // At this point, the old content will have been purged and the fresh content will
	              // have been added to the cache.
	              // It's the perfect time to display a "New content is available; please refresh."
	              // message in the page's interface.
	              console.log('New or updated content is available.');
	            } else {
	              // At this point, everything has been precached.
	              // It's the perfect time to display a "Content is cached for offline use." message.
	              console.log('Content is now available offline!');
	            }
	            break;

	          case 'redundant':
	            console.error('The installing service worker became redundant.');
	            break;
	        }
	      };
	    };
	  }).catch(function(e) {
	    console.error('Error during service worker registration:', e);
	  });
	}

	/* ==========================================================================
	// manifest
	========================================================================== */


	window.addEventListener('beforeinstallprompt', function(e) {
	  // beforeinstallprompt Event fired

	  // e.userChoice will return a Promise. 
	  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
	  e.userChoice.then(function(choiceResult) {

	    console.log(choiceResult.outcome);

	    if(choiceResult.outcome == 'dismissed') {
	      console.log('User cancelled home screen install');
	    }
	    else {
	      console.log('User added to home screen');
	    }
	  });
	});

})();


$(document).ready(function(){
	/* ==========================================================================
	// bowser
	========================================================================== */

	//browsers:
	// safari
	// firefox
	// chrome
	// msedge
	// msie
	// mobile
	// ios

	if (bowser.msedge) {
	  //need this since modernizr doesn't add this one
	  $('body').addClass('msedge');
	}
	if (bowser.safari) {
	  $('body').addClass('safari');
	}
	if (bowser.iPhone) {
	  $('body').addClass('iphone');
	}
	if (bowser.mobile && bowser.safari && bowser.version <= 8) {
	  $('body').addClass('iphone-8-or-less');
	}
	if (bowser.tablet) {
	  $('body').addClass('tablet');
	}
	if (!bowser.tablet && !bowser.mobile) {
	  $('body').addClass('desktop');
	}
	if (bowser.mobile) {
	  $('body').addClass('mobile');
	}

	/* ==========================================================================
	testing
	========================================================================== */

	//media size
	$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
	  // newSize is the name of the now-current breakpoint, oldSize is the previous breakpoint
	  // console.log(newSize);
	});

});