const mongoose = require('mongoose')
const toJson = require('meanie-mongoose-to-json')
const User = require('../models/user')


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {type: Number, default: 0},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [],
    createdAt: String,
})

blogSchema.plugin(toJson)

module.exports = mongoose.model('Blog', blogSchema)