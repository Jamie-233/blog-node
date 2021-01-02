const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // login
  if(method === 'GET' && path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)
    return result.then((data) => {
      if(data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        console.log('session is ', req.session)
        return new SuccessModel('login success')
      }
      return new ErrorModel('login faild')
    })
  }

  // login verification
  if(method === 'GET' && req.path === '/api/user/login-test') {
    console.log(req.session)
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('no login'))
  }
}

module.exports = handleUserRouter
