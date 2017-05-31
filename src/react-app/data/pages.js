var browser = require('browser-size')();

let pagesData = []

if(browser.width > 1200) {
//if not mobile
//enable three scene
pagesData =	[
		"index",
		"pursuit",
		"psychology",
		"jumps",
		"height",
		"hangtime",
		"rotation",
		"landing",
		"perspective",
		"stages",
		"anatomy",
		"firsts",
		"quint",
		"promo"
	]

} else {
//if mobile
pagesData =	[
		"index",
		"pursuit",
		"psychology",
		"jumps",
		"height",
		"hangtime",
		"rotation",
		"landing",
		"perspective",
		"stages",
		"anatomy",
		"firsts",
		"quint",
		"promo"
	]

}

module.exports = pagesData;