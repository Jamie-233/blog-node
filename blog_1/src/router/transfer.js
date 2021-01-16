const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
  console.log(req.session)
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel('no login')
    )
  }
}

const transferApi = (req) => {
  const { to_user, money } = req
  return Promise.resolve({
    user: to_user,
    money: money
  });
}

const handleTransferRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  console.log(req.query)

  if(method === 'GET' && path === '/transfer') {
    const loginCheckResult = loginCheck(req)
    console.log('------------', loginCheckResult)
    if(loginCheckResult) {
      return loginCheckResult
    }
    const result = transferApi(req.query)
    return result.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  // if(method === 'POST' && path === '/api/blog/new') {
  //   const loginCheckResult = loginCheck(req)
  //   if(loginCheckResult) {
  //     return loginCheckResult
  //   }
  //
  //   req.body.author = req.session.username
  //
  //   const result = newBlog(req.body)
  //   return result.then((data) => {
  //     return new SuccessModel(data)
  //   })
  // }
}
module.exports = handleTransferRouter
