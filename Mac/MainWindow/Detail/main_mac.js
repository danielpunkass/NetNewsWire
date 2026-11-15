function scrollDetection() {
	window.onscroll = function(event) {
		window.webkit.messageHandlers.windowDidScroll.postMessage(window.scrollY);
	}
}

function linkHover() {
	window.onmouseover = function(event) {
		var closestAnchor = event.target.closest('a')
		if (closestAnchor) {
			window.webkit.messageHandlers.mouseDidEnter.postMessage(closestAnchor.href);
		}
	}
	window.onmouseout = function(event) {
		var closestAnchor = event.target.closest('a')
		if (closestAnchor) {
			window.webkit.messageHandlers.mouseDidExit.postMessage(closestAnchor.href);
		}
	}
}

// Tells the app whether any text is selected, for Use Selection for Find.
function selectionDetection() {
	var hadSelection = false;
	document.addEventListener("selectionchange", function() {
		var hasSelection = !window.getSelection().isCollapsed;
		if (hasSelection !== hadSelection) {
			hadSelection = hasSelection;
			window.webkit.messageHandlers.selectionDidChange.postMessage(hasSelection);
		}
	});
}

function postRenderProcessing() {
	scrollDetection();
	linkHover();
	selectionDetection();
}
