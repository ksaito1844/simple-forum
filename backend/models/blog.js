const mongoose = require('mongoose')
const toJson = require('meanie-mongoose-to-json')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
  createdAt: String,
})

blogSchema.plugin(toJson)

module.exports = mongoose.model('Blog', blogSchema)