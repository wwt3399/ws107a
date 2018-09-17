const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
switch (req.url) {
  case '/hello':
  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  res.end('<html><head></head><body><p>你好</p></body></html>');
  break;
  case '/name':
  res.setHeader('Content-Type', 'text/html;charset=UTF-8'); 
  res.end('<html><head></head><body><p>王文涛</p></body></html>');
  break;
  case '/id':
  res.setHeader('Content-Type', 'text/html;charset=UTF-8'); 
  res.end('<html><head></head><body><p>110510543</p></body></html>');
  break;
  case '/':
  res.statusCode = 404;
  res.end();
  break;
}})

server.listen(3000)

console.log('Server running at http://localhost:3000')

