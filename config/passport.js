const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userDB = require('../models/userDB')
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  //設定登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    userDB.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false)
      }
      if (user.password !== password) {
        return done(null, false)
      }
      return done(null, user)
    }).catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    userDB.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
