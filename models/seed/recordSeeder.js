const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const userDB = require('../userDB')
const recordDB = require('../recordDB')
const categoryIcon = require('../../public/icon/categoryIcon')
const newDate = require('../../public/javaScript/date')

const SEED_USER1 = {
  name: 'root01',
  email: 'root01@example.com',
  password: '1234'
}

const SEED_USER2 = {
  name: 'root02',
  email: 'root02@example.com',
  password: '5678'
}

const SEED_RECORD01 = [{
  name: '房屋稅',
  amount: 2000,
  categoryIcon: categoryIcon[0].icon,
  categoryId: categoryIcon[0].id
}, {
  name: '燃料稅',
  amount: 7000,
  categoryIcon: categoryIcon[1].icon,
  categoryId: categoryIcon[1].id
}, {
  name: '劍湖山門票',
  amount: 600,
  categoryIcon: categoryIcon[2].icon,
  categoryId: categoryIcon[2].id
}, {
  name: '麥當勞',
  amount: 120,
  categoryIcon: categoryIcon[3].icon,
  categoryId: categoryIcon[3].id
}, {
  name: '水電費',
  amount: 1200,
  categoryIcon: categoryIcon[4].icon,
  categoryId: categoryIcon[4].id
}]

const SEED_RECORD02 = [{
  name: '土地稅',
  amount: 3000,
  categoryIcon: categoryIcon[0].icon,
  categoryId: categoryIcon[0].id
}, {
  name: '牌照稅',
  amount: 3000,
  categoryIcon: categoryIcon[1].icon,
  categoryId: categoryIcon[1].id
}, {
  name: '六福村門票',
  amount: 700,
  categoryIcon: categoryIcon[2].icon,
  categoryId: categoryIcon[2].id
}, {
  name: '肯德基',
  amount: 140,
  categoryIcon: categoryIcon[3].icon,
  categoryId: categoryIcon[3].id
}, {
  name: '網路費',
  amount: 900,
  categoryIcon: categoryIcon[4].icon,
  categoryId: categoryIcon[4].id
}]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


db.on('error', () => console.log('mongoose error!'))
db.once('open', () => {
  bcrypt.genSalt(10).then(salt => bcrypt.hash(SEED_USER1.password, salt)).then(
    hash =>
      userDB.create({
        name: SEED_USER1.name,
        email: SEED_USER1.email,
        password: hash
      })
  ).then(user => {
    const userId = user._id
    return Promise.all(Array.from({ length: SEED_RECORD01.length }, (_, i) => {
      recordDB.create({
        name: SEED_RECORD01[i].name,
        amount: SEED_RECORD01[i].amount,
        categoryIcon: SEED_RECORD01[i].categoryIcon,
        categoryId: SEED_RECORD01[i].categoryId,
        createAt: newDate(),
        userId
      })
    }))
  }).then(() => {
    bcrypt.genSalt(10).then(salt => bcrypt.hash(SEED_USER2.password, salt)).then(hash =>
      userDB.create({
        name: SEED_USER2.name,
        email: SEED_USER2.email,
        password: hash
      })
    ).then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: SEED_RECORD02.length }, (_, i) => {
        recordDB.create({
          name: SEED_RECORD02[i].name,
          amount: SEED_RECORD02[i].amount,
          categoryIcon: SEED_RECORD02[i].categoryIcon,
          categoryId: SEED_RECORD02[i].categoryId,
          createAt: newDate(),
          userId
        }).then(() => {
          console.log('done!')
          process.exit()
        })
      }))
    })
  })
})