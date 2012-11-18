spawn = require('child_process').spawn
http = require 'http'

http.createServer (req, res) ->
  res.writeHead 200, 'Content-Type': 'text/html'
  res.end '''
    <style>
      .bottom a {
        position: absolute;
        bottom: 5px;
        outline: 1px dotted;
      }
      [href=left] { left: 10px; }
      [href^=center] { left: 50%; text-align: center; margin-left: -64px; }
      [href=right] { right: 10px; text-align: right; }
    </style>
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

    <p class="bottom">
      <a href="left">bottom left</a>
      <a href="center?something+very+long+that+just+will+not+work+with+anything+really">bottom center (long)</a>
      <a href="right">bottom right</a>
    </p>
  '''
.listen 8001, '127.0.0.1'
spawn 'open', ['http://127.0.0.1:8001']
