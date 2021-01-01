const queryString = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }

    if(req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''

    req.on('data', (chunk) => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if(!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = queryString.parse(url.split('?')[1])

  // 处理 post data
  getPostData(req).then((postData) => {
    req.body = postData

    const blogData = handleBlogRouter(req, res)
    if(blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    const userData = handleUserRouter(req, res)
    if(userData) {
      res.end(
        JSON.stringify(userData)
      )
      return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found")
    res.end()
  })

}

module.exports = serverHandle
