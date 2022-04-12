if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const mongooseURI = process.env.mongooseURI
mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => console.log('mongoose error:' + error))

db.once('open', () => console.log('mongoose connected!'))

module.exports = db