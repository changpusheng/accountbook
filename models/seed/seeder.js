const db = require('../../config/mongoose')
const categoryDB = require('../categoryDB')
const categoryIcon = require('../../public/icon/categoryIcon')

db.on('error', () => console.log('mongoose error!'))

db.once('open', () => {
  categoryIcon.forEach(item => categoryDB.create({
    id: Number(item.id),
    name: item.name,
    icon: item.icon
  }))
})