const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createAt: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,  
    ref: 'UserDB',
    index: true,
    required: false
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryDB',
    index: true,
    required: false
  }
})

module.exports = mongoose.model('RecordDB', recordSchema)