const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const SESSION_DATA = {}

const getCookieExprires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString is ', d.toGMTString())
  return d.toGMTString()
}

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

  // get path
  const url = req.url
  req.path = url.split('?')[0]

  // parsing query
  req.query = queryString.parse(url.split('?')[1])

  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach((item) => {
    if(!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    console.log('61', key, val)
    req.cookie[key] = val
  })

  // process session
  let needSession = false
  let userId = req.cookie.userid
  if(userId) {
    if(!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  }
  else {
    needSession = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  // process post data
  getPostData(req).then((postData) => {
    req.body = postData

    const blogResult = handleBlogRouter(req, res)
    if(blogResult) {
      blogResult.then((blogData) => {
        if(needSession) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExprires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    const userResult = handleUserRouter(req, res)
    if(userResult) {
      userResult.then((userData) => {
        if(needSession) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExprires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found")
    res.end()
  })

}

module.exports = serverHandle
