const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author='${author}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}';`
  return exec(sql).then((rows) => rows[0])
}

const newBlog = (blogData = {}) => {
  const { title, content, author, createtime = Date.now() } = blogData

  const sql = `
    insert into blogs (title, content, author, createtime)
    values ('${title}', '${content}', '${author}', ${createtime});
  `
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData) => {
  const { title, content } = blogData

  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  return exec(sql).then((result) => {
    if(result.affectedRows > 0) return true
    return false
  })
}

const delBlog = (id, delData) => {
  const { author } = delData

  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then((result) => {
    if(result.affectedRows > 0) return true
    return false
  })
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}
