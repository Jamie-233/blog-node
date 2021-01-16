const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// read file content
// fs.readFile(fileName, (err, data) => {
//   if(err) {
//     console.error(err)
//     return
//   }
//
//   console.log(data.toString())
//
// })

// const content = 'this is new content \n'
// const opt = {
//   flag: 'a' // append or 'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//   if(err) {
//     console.error(err)
//   }
// })

// fs.exists(fileName, (exist) => {
//   console.log('exist', exist)
// })
