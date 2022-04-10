const express = require('express')
const router = express.Router()
const recordDB = require('../../models/recordDB')
const categortDB = require('../../models/categoryDB')
const categoryIcon = require('../../public/icon/categoryIcon')
let selectOptionValueNumber
let editItem

router.get('/', (req, res) => {
  const userId = req.user._id
  selectOptionValueNumber = 0
  recordDB.find({
    userId
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

router.post('/', (req, res) => {
  const selectOptionValue = req.body.indexSelect
  const userId = req.user._id
  selectOptionValueNumber = Number(selectOptionValue)
  if (!selectOptionValueNumber) {
    return res.redirect('/')
  }

  recordDB.find({
    $and: [{ categoryId: selectOptionValue }, { userId }]
  }).lean().then(item => {
    let totalAmount = 0
    item.forEach(itemObj => {
      return totalAmount += itemObj.amount
    })
    res.render('index', {
      item, totalAmount, selectOptionValueNumber
    })
  }).catch(err => console.log('err' + err))
})

router.get('/new', (req, res) => {
  res.render('new', { categoryIcon })
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const id = Number(category)
  const error = []
  if (!id || !name || !date || !category || !amount) {
    error.push({ message: '請選擇類別或輸入空格' })
    return res.render('new', {
      error,
      name,
      date,
      category,
      amount,
      categoryIcon
    })
  }
  categortDB.findOne({ id }).lean().then(item => {
    recordDB.create({
      name,
      createAt: date,
      amount,
      categoryIcon: item.icon,
      userId,
      categoryId: id
    })
  }).then(() => res.redirect('/'))
    .catch(err => console.log('err:' + err))
})

router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  recordDB.findById(id).lean().then(item => {
    editItem = item
    res.render('edit', { item, categoryIcon })
  }).catch(err => console.log('err' + err))
})

router.put('/:_id', (req, res) => {
  const id = req.params._id
  const { name, date, amount, editSelectValue } = req.body
  const category = categoryIcon.find(obj => obj.id === editSelectValue)
  const error = []
  if (!editSelectValue || !name || !date || !amount) {
    error.push({ message: '請選擇類別' })
    return res.render('edit', {
      item: editItem,
      error,
      categoryIcon
    })
  }
  recordDB.findById(id).then(item => {
    item.name = name
    item.createAt = date
    item.amount = amount
    item.categoryIcon = category.icon,
      item.categoryId = editSelectValue
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