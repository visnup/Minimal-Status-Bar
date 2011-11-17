var statusBar;

if (window.top === window) {
  function ready() { document.body.addEventListener('mouseover', hover); }
  if (document.readyState === 'complete')
    ready();
  else
    document.addEventListener('DOMContentLoaded', ready);

  function hover(e) {
    var el = e.target;
    while (el && el.nodeName !== 'A')
      el = el.parentNode;

    if (el && el.attributes.href)
      displayStatus(el.attributes.href.value);
    else
      hideStatus();
  }

  function displayStatus(href) {
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.id = 'com-fortnight-status-bar';
      document.body.appendChild(statusBar);
    }

    statusBar.innerText = 'Go to “' + href + '”';
    setTimeout(function() {
      statusBar.className = 'active';
    }, 1);
  }

  function hideStatus() {
    if (statusBar)
      statusBar.className = '';
  }
}
