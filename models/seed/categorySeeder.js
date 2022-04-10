const db = require('../../config/mongoose')
const categoryDB = require('../categoryDB')
const categoryIcon = require('../../public/icon/categoryIcon')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.on('error', () => console.log('mongoose error!'))

db.once('open', () => {
  return Promise.all(Array.from({ length: categoryIcon.length }, (_, i) =>
    categoryDB.create({
      id: Number(categoryIcon[i].id),
      name: categoryIcon[i].name,
      icon: categoryIcon[i].icon
    })
  )).then(() => {
    console.log('done')
    process.exit()
  })
})

