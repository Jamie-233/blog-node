const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容B',
      createTime: 1609493641936,
      author: 'Jenkin'
    },
    {
      id: 2,
      title: 'titleB',
      content: 'contentB',
      createTime: 1609493642236,
      author: 'Ken'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容B',
    createTime: 1609493641936,
    author: 'Jenkin'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData) => {
  console.log(id, blogData)
  return false
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}
