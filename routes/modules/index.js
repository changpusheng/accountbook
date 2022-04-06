const express = require('express')
const router = express.Router()
const recordDB = require('../../models/recordDB')
const categortDB = require('../../models/categoryDB')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/new', (req, res) => {
  categortDB.find().lean().then(item => {
    res.render('new', { item })
  })
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  console.log(name, date, category, amount)
  // categortDB.create({
  //   id: Number(category),
  //   name
  // }).then(() => {
  //   recordDB.create({
  //     name,
  //     createAt: date,
  //     amount
  //   })
  // }).then(() => { res.redirect('/') })
  //   .catch(err => console.log('err' + err))

})

router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router