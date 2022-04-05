const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const index = require('./modules/index')

router.use('/user', user)
router.use('/', index)

module.exports = router