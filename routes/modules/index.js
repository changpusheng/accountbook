const express = require('express')
const router = express.Router()
const recordDB = require('../../models/recordDB')
const categortDB = require('../../models/categoryDB')

router.get('/', (req, res) => {
  recordDB.find().lean().then(item => {
    let totalAmount = 0
    item.forEach(item => {
      return totalAmount += item.amount
    })
    res.render('index', {
      item, totalAmount
    })
  }).catch(err => console.log('err' + err))
})

router.get('/new', (req, res) => {
  categortDB.find().lean().then(item => {
    res.render('new', { item })
  })
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  recordDB.create({
    name,
    createAt: date,
    amount,
    category
  }).then(() => res.redirect('/'))
    .catch(err => console.log('err:' + err))
})

router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  recordDB.findById(id).lean().then(item => {
    res.render('edit', { item })
  }).catch(err => console.log('err' + err))
})


router.put('/:_id', (req, res) => {
  const id = req.params._id
  const { name, date, amount } = req.body
  console.log(name, date, amount)
  recordDB.findById(id).then(item => {
    item.name = name
    item.createAt = date
    item.amount = amount
    return item.save()
  }).then(() => res.redirect('/'))
    .catch(err => console.log('err' + err))
})

router.delete('/:_id', (req, res) => {
  const id = req.params._id
  recordDB.findById(id).then(item => item.remove()
  ).then(() => res.redirect('/')).catch(err => console.log('err' + err))
})

module.exports = router