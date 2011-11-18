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
      displayStatus(el, e);
    else
      hideStatus();
  }

  function displayStatus(el, e) {
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.id = 'com-fortnight-status-bar';
      document.body.appendChild(statusBar);
    }

    var href = el.attributes.href.value
      , email = href.match(/^mailto:([^?]+)(\?subject=([^&]+))?/i);
    if (email) {
      statusBar.innerText = 'Send email to ' + email[1];
      if (email[3])
        statusBar.innerText += ' with subject “' + email[3] + '”';
    } else {
      statusBar.innerText = 'Go to “' + href + '”';
    }
    setTimeout(function() { statusBar.className = 'active'; }, 1);
  }

  function hideStatus() {
    if (statusBar)
      statusBar.className = '';
  }
}
