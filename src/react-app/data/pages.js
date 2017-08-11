//makse sure the first page is the index page (when going to a nonexistant page it will forward to the first page)
let pagesData = [
	{ id: 'page1', isSet: false, name: "01", class: "nav-link", component: 'Page1', icon: ""},
	{ id: 'page2', isSet: false, name: "02", class: "nav-link", component: 'Page2', icon: "" },
	{ id: 'page3', isSet: false, name: "03", class: "nav-link", component: 'Page3', icon: "" }
]

module.exports = pagesData;