spawn = require('child_process').spawn
http = require 'http'

http.createServer (req, res) ->
  res.writeHead 200, 'Content-Type': 'text/html'
  res.end '''
    <ul>
      <li><a href="/relative">a relative link</a></li>
      <li><a href="http://google.com">google.com</a></li>
      <li><a href="http://is.gd/w">shortened link</a></li>
      <li><a href="mailto:visnupx@gmail.com">mailto link</a></li>
      <li><a href="mailto:visnupx@gmail.com?subject=feedback">mailto link + subject</a></li>
      <li><a href="mailto:visnupx@gmail.com?subject=feedback&body=yo">mailto link + subject + body</a></li>
      <li><a href="/elsewhere" target="_blank">target=_blank</a></li>
    </ul>

    <ul>
      <li><a href="/relative">hold down cmd</a></li>
      <li><a href="/relative">hold down cmd+option</a></li>
      <li><a href="/relative">hold down alt</a></li>
      <li><a href="/relative">hold down control</a></li>
    </ul>
  '''
.listen 8001, '127.0.0.1'
spawn 'open', ['http://127.0.0.1:8001']
