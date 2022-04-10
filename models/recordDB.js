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
  
  categoryIcon: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserDB',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('RecordDB', recordSchema)