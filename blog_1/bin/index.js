const http = require('http')
// const queryString = require('querystring')
const serverHandle = require('../app');
const PORT = 3000

const server = http.createServer((req, res) => {
  // const method = req.method
  // const url = req.url
  // const path = url.split('?')[0]
  // const query = queryString.parse(url.split('?')[1])
  // res.setHeader('Content-type', 'application/json')
  serverHandle(req, res)
})

server.listen(PORT, () => {
  console.log('server listening on 3000 port')
})
