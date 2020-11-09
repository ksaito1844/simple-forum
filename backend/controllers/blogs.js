const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.find({}).populate('comments')
  const returnBlog = blogs.filter(b => b.id === req.params.id)
  res.json(returnBlog)
})

blogsRouter.post('/', async (req, res) => {
  const body = await req.body
  const decodedToken = await jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author.name,
    url: body.url,
    user: user._id,
    createdAt: body.createdAt
  })
  console.log(blog)

  if (!blog.title || !blog.url)
    return res.status(400).json({ error: 'Bad Request' })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await res.json(savedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const body = await req.body
  const user = await User.findById(body.user)
  const content = body.content

  const comment = new Comment({
    author: user.username,
    user: user._id,
    content: content,
    createdAt: body.createdAt,
  })

  const savedComment = await comment.save()

  await Blog.findByIdAndUpdate
  (req.params.id, { $push: { comments: savedComment } }, { new: true })

  user.comments = user.comments.concat(savedComment._id)
  await user.save()

  const blogs = await Blog.find({}).populate('comments')
  const returnBlog = await blogs.filter(b => b.id === req.params.id)
  console.log(returnBlog)
  res.json(returnBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const contents = await req.body

  const blog = {
    title: contents.title,
    author: contents.author,
    url: contents.url,
    likes: contents.likes + 1,
  }
  for (let prop in blog) if (!blog[prop]) delete blog[prop]
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = await jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter