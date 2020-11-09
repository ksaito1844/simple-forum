const mongoose = require('mongoose')
const toJson = require('meanie-mongoose-to-json')

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  createdAt: String,
})

commentSchema.plugin(toJson)

module.exports = mongoose.model('Comment', commentSchema)