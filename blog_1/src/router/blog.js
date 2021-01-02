const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
  console.log(req.session)
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel('no login')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0]
  const id = req.query.id

  if(method === 'GET' && path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if(req.query.isadmin) {
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult) {
        return loginCheckResult
      }

      author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  if(method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if(method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username

    const result = newBlog(req.body)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  if(method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username

    const result = delBlog(id, req.body)
    return result.then((val) => {
      if(val) {
        return new SuccessModel('delete success')
      }
      return new ErrorModel('delete faild')
    })
  }

  if(method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheckResult
    }

    const result = updateBlog(id, req.body)
    return result.then((val) => {
      if(val) {
        return new SuccessModel('update success')
      }
      return new ErrorModel('update faild')
    })
  }
}

module.exports = handleBlogRouter
