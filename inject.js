var statusBar, el;

if (window.top === window) {
  safari.self.addEventListener('message', function handleMessage(e) {
    switch (e.name) {
      case 'displayStatus':
        displayStatus(e.message);
      case 'hideStatus':
        hideStatus();
    }
  }, false);

  window.addEventListener('blur', function() {
    if (statusBar)
      statusBar.classList.add('blur');
  });
  window.addEventListener('focus', function() {
    if (statusBar)
      statusBar.classList.remove('blur');
  });
}

if (document.readyState === 'complete')
  ready();
else
  document.addEventListener('DOMContentLoaded', ready);

function ready() { document.body.addEventListener('mouseover', mouseover); }

function mouseover(e) {
  el = e.target;
  while (el && el.nodeName !== 'A')
    el = el.parentNode;

  if (el && el.attributes.href) {
    safari.self.tab.dispatchMessage('mouseover', {
      href: el.href,
      hrefRelative: el.attributes.href.value,
      target: el.target,
      metaKey: e.metaKey,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey
    });
  } else {
    safari.self.tab.dispatchMessage('mouseout');
  }
}

function keyChanged(e) {
  switch (e.keyCode) {
    case 17:
      safari.self.tab.dispatchMessage('mouseover', { ctrlKey: e.ctrlKey });
      break;
    case 18:
      safari.self.tab.dispatchMessage('mouseover', { altKey: e.altKey });
      break;
    case 91:
      safari.self.tab.dispatchMessage('mouseover', { metaKey: e.metaKey });
      break;
  }
}

function elementsIntersect(a, b) {
  if (!a || !b) return;
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
  setTimeout(function() {
    statusBar.classList.add('active');
    document.body.addEventListener('keydown', keyChanged);
    document.body.addEventListener('keyup', keyChanged);
  }, 1);

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
  if (!statusBar) return;

  statusBar.classList.remove('active');
  document.body.removeEventListener('keydown', keyChanged);
  document.body.removeEventListener('keyup', keyChanged)
}
