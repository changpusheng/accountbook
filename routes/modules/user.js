const express = require('express')
const router = express.Router()
const passport = require('passport')
const userDB = require('../../models/userDB')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login', { layout: false })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
  failureRedirect: '/user/login'
}))

router.get('/register', (req, res) => {
  res.render('register', { layout: false })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const error = []
  if (!name || !email || !password || !confirmPassword) {
    error.push({ message: '有空格' })
  }
  if (password !== confirmPassword) {
    error.push({ message: '密碼與確認密碼不同!' })
  }
  if (error.length) {
    return res.render('register', {
      error,
      name,
      email,
      password,
      confirmPassword
    })
  }
  userDB.findOne({ email }).then(user => {
    if (user) {
      error.push({ message: '帳號已註冊!' })
      return res.render('register', {
        error,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          userDB.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => res.redirect('/')).catch(err => console.log('user Create err:' + err))
    }
  }).catch(err => console.log(err))
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/user/login')
})

module.exports = router