var statusBar;

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
    var el = e.target;
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

  function displayStatus(text) {
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.id = 'com-fortnight-status-bar';
      document.body.appendChild(statusBar);
    }

    statusBar.innerText = text;
    setTimeout(function() { statusBar.className = 'active'; }, 1);
  }

  function hideStatus() {
    if (statusBar)
      statusBar.className = '';
  }
}
