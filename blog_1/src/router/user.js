const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // login
  if(method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then((row) => {
      if(row.username) {
        // setting session
        req.session.username = row.username
        req.session.realname = row.realname

        // sync redis
        set(req.sessionId, req.session)
        return new SuccessModel('login success')
      }
      return new ErrorModel('login faild')
    })
  }

  // login verification
  // if(method === 'GET' && req.path === '/api/user/login-test') {
  //   if(req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   }
  //   return Promise.resolve(new ErrorModel('no login'))
  // }
}

module.exports = handleUserRouter
