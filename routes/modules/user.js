const express = require('express')
const router = express.Router()
const passport = require('passport')
const userDB = require('../../models/userDB')

router.get('/login', (req, res) => {
  res.render('login', { layout: false })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.get('/register', (req, res) => {
  res.render('register', { layout: false })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  userDB.findOne({ email }).then(user => {
    if (user) {
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return userDB.create({
        name,
        email,
        password
      }).then(() => res.redirect('/')).catch(err => console.log('user Create err:' + err))
    }
  }).catch(err => console.log(err))
})


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router