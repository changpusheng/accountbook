const express = require('express')
const router = express.Router()
const recordDB = require('../../models/recordDB')
const categortDB = require('../../models/categoryDB')
const categoryIcon = require('../../public/icon/categoryIcon')
let selectOptionValueNumber

console.log(categoryIcon[0].icon)

router.get('/', (req, res) => {
  selectOptionValueNumber = 0
  recordDB.find().lean().then(item => {
    let totalAmount = 0
    item.forEach(item => {
      return totalAmount += item.amount
    })
    res.render('index', {
      item, totalAmount, selectOptionValueNumber
    })
  }).catch(err => console.log('err' + err))

})

router.post('/', (req, res) => {
  const selectOptionValue = req.body.indexSelect
  selectOptionValueNumber = Number(selectOptionValue)
  if (!Number(selectOptionValue)) {
    return res.redirect('/')
  }

  recordDB.find({
    categoryId: selectOptionValue
  }).lean().then(item => {
    let totalAmount = 0
    item.forEach(item => {
      return totalAmount += item.amount
    })
    res.render('index', {
      item, totalAmount, selectOptionValueNumber
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
  const id = Number(category)
  categortDB.findOne({ id }).lean().then(item => {
    let categortDbItem = item.icon
    recordDB.create({
      name,
      createAt: date,
      amount,
      categoryIcon: categortDbItem,
      categoryId: id
    })
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
  const { name, date, amount, editSelectValue } = req.body

  const category = categoryIcon.find(obj => obj.id === editSelectValue)

  recordDB.findById(id).then(item => {
    item.name = name
    item.createAt = date
    item.amount = amount
    item.categoryIcon = category.icon
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