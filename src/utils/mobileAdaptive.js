(function (doc, win) {
	var docEl = doc.documentElement;
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		if (clientWidth > 414) {
			docEl.style.fontSize = '110.4px'
		} else {
			docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
		}
	};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DO' +
    'MContentLoaded', recalc, false);


	if (window.devicePixelRatio && devicePixelRatio >= 2) {
		var testElem = document.createElement('div');
		testElem.style.border = '.5px solid transparent';
		document.body.appendChild(testElem);
		if (testElem.offsetHeight != 1) {
			document.querySelector('body').classList.add('no-dot5px');
		}
		document.body.removeChild(testElem);
	}

})(document, window);
