const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const index = require('./modules/index')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, index)

module.exports = router