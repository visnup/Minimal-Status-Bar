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

    statusBar.innerText = getStatus(el, e);
    setTimeout(function() { statusBar.className = 'active'; }, 1);
  }

  function hideStatus() {
    if (statusBar)
      statusBar.className = '';
  }

  function getStatus(el, e) {
    var href = el.attributes.href.value
      , email = href.match(/^mailto:([^?]+)(\?subject=([^&]+))?/i);

    if (email) {
      return 'Send email to ' + email[1] + (email[3] ? ' with subject “' + decodeURIComponent(email[3]) + '”' : '');
    } else if (e.metaKey) {
      if (e.altKey) {
        return 'Open “' + href + '” in a new window behind the current window';
      } else {
        return 'Open “' + href + '” in a new tab behind the current one';
      }
    } else if (e.altKey) {
      return 'Download “' + href + '”';
    } else if (e.ctrlKey) {
      return 'Display a menu for “' + href + '”';
    } else if (el.target) {
      return 'Open “' + href + '” in a new tab';
    } else {
      return 'Go to “' + href + '”';
    }
  }
}
