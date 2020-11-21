const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id', async (req, res) => {
  const posts = await Blog.find({}).populate('comments')
  const postComments = posts.filter(b => b.id === req.params.id)
  console.log(postComments.comments)
  res.json(postComments.comments)
})


module.exports = commentsRouter