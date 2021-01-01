const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
  console.log(req.method);
  const url = req.url
  console.log(url);
  req.query = queryString.parse(url.split('?')[1]);
  res.end(JSON.stringify(req.query))

  // res.writeHead(200, {'content-type': 'text/html'})
  // res.end('<h1>hello world</h1>')
})

server.listen(3000, () => {
  console.log('listening no 3000 port')
})
