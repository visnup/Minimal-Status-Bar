var statusBar, el, isMetaKeyDown, isCtrlKeyDown, isAltKeyDown;

if (window.top === window) {
  if (document.readyState === 'complete')
    ready();
  else
    document.addEventListener('DOMContentLoaded', ready);

  safari.self.addEventListener('message', function handleMessage(e) {
    switch (e.name) {
      case 'displayStatus':
        displayStatus(e.message);
    }
  }, false);

  function ready() { document.body.addEventListener('mouseover', hover); }

  function hover(e) {
    el = e.target;
    while (el && el.nodeName !== 'A')
      el = el.parentNode;

    if (el && el.attributes.href) {
      isMetaKeyDown = e.metaKey;
      isCtrlKeyDown = e.ctrlKey;
      isAltKeyDown = e.altKey;
      dispatch();
    } else {
      hideStatus();
    }
  }

  function keyChanged(e) {
    switch (e.keyCode) {
      case 17:
        isCtrlKeyDown = !isCtrlKeyDown;
        dispatch();
        break;
      case 18:
        isAltKeyDown = !isAltKeyDown;
        dispatch();
        break;
      case 91:
        isMetaKeyDown = !isMetaKeyDown;
        dispatch();
        break;
    }
  }

  function dispatch() {
    safari.self.tab.dispatchMessage('hover', {
      href: el.attributes.href.value,
      target: el.target,
      metaKey: isMetaKeyDown,
      ctrlKey: isCtrlKeyDown,
      altKey: isAltKeyDown
    });
  }

  function elementsIntersect(a, b) {
    a = a.getBoundingClientRect();
    b = b.getBoundingClientRect();
    var xIntersect = (a.left <= b.left && b.left <= a.right) ||
      (b.left <= a.left && a.left <= b.right);
    var yIntersect = (a.top <= b.top && b.top <= a.bottom) ||
      (b.top <= a.top && a.top <= b.bottom);
    return xIntersect && yIntersect;
  }

  function displayStatus(text) {
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.id = 'com-fortnight-status-bar';
      document.body.appendChild(statusBar);
    }

    statusBar.innerText = text;
    setTimeout(function() { statusBar.classList.add('active'); }, 1);
    document.body.addEventListener('keydown', keyChanged);
    document.body.addEventListener('keyup', keyChanged);

    // If the statusbar overlaps the hovered element, try moving it to the
    // right side of the viewport. If it still overlaps, give up and put it
    // back.
    statusBar.classList.remove('right-side');
    if (elementsIntersect(statusBar, el)) {
      statusBar.classList.add('right-side');
      if (elementsIntersect(statusBar, el))
        statusBar.classList.remove('right-side');
    }
  }

  function hideStatus() {
    if (statusBar) {
      document.body.removeEventListener('keydown', keyChanged);
      document.body.removeEventListener('keyup', keyChanged)
      statusBar.classList.remove('active');
    }
  }
}
