const {
  login,
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  if(method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    if(result) {
      return new SuccessModel('login success')
    }
    else {
      return new ErrorModel('login faild')
    }
  }
}

module.exports = handleUserRouter
