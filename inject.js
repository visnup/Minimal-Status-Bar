var statusBar, el;

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

    if (el && el.attributes.href)
      safari.self.tab.dispatchMessage('hover', {
        href: el.attributes.href.value,
        target: el.target,
        metaKey: e.metaKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey
      });
    else
      hideStatus();
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
    if (statusBar)
      statusBar.classList.remove('active');
  }
}
