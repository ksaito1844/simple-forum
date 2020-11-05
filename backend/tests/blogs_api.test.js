const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helpers')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


let user
describe('Get requests to blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.blogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  test('correct number of blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    await api
      .get('/api/blogs')
      .expect(200)
    expect(res.body).toHaveLength(6)
  })

  test('id field exists and is named id', async () => {
    const res = await api.get('/api/blogs')

    await api
      .get('/api/blogs')
      .expect(200)
    const firstBlog = res.body[0]
    expect(Object.keys(firstBlog)[4]).toBeDefined()
    expect(Object.keys(firstBlog)[4]).toBe('id')
  })
})

describe('Creating a blog', () => {
  let token
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    user = new User({
      username: 'root',
      name: 'Master User',
      password: passwordHash
    })
    await user.save()

    const userForToken = {
      username: user.username,
      id: user.id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    await Blog.deleteMany({})
    const blogObject = helper.blogs
      .map(blog => new Blog({...blog, user: user.id }))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)

  })

  test('blog is successfully created', async () => {

    const newBlogPost = {
      title: 'Brooke smells like poop',
      author: 'George C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  })

  test('If likes value is missing will default to 0', async () => {

    const user = new User({ username: 'BigPusha', name: 'Salama' })
    await user.save()

    const newBlogPost = {
      title: 'Brooke smells like poop',
      author: 'George C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      userId: user._id
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('If title and url are missing respond with 400 Bad Request', async () => {

    const user = new User({ username: 'BigPusha', name: 'Salama' })
    await user.save()

    const badBlogPost = {
      author: 'Poo C. Pee',
      likes: 7,
      userId: user._id
    }

    await api
      .post('/api/blogs')
      .send(badBlogPost)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('Successful deletion of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

    const title = blogsAtEnd.map(r => r.content)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('Successfully update a blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const updates = {
      author: 'Poo C. Pee',
      likes: 7
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(updates.likes)

  })
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('Validation is working correctly for creating new users', () => {
  test('return correct error if username is not at least 3 characters in length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Do',
      name: 'Dustin',
      password: 'thisisasecret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
  test('return correct error if password is not 6 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Doostin',
      name: 'Dustin',
      password: 'do'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password must be at least 6 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
  test('return correct error if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Doostin',
      name: 'Dustin',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('missing username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
  test('return correct error if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Dustin',
      password: 'doodooo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('missing username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})