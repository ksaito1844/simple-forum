const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, post: 1 })
  await response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    //validation
    if (!body.password || !body.username) {
      return response.status(401).json({ error: 'missing username or password' })
    } else if (body.password.length < 6) {
      return response.status(401).json({ error: 'password must be at least 6 characters long' })
    } else if (body.username.length < 3) {
      return response.status(401).json({ error: 'username must be at least 3 characters long' })
    }

    const savedUser = await user.save()

    await response.json(savedUser)
  } catch (error) {
    return response.json(error)
  }

})

module.exports = usersRouter