const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
    {
        likes: 7,
        title: "React patterns",
        author: "Poo D. Pee",
        url: "https://reactpatterns.com/",
        id: "5a422a851b54a676234d17f7",
        userId: "5f63f20d05c8c3f40628dd23"
    },
    {
        likes: 0,
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        id: "5a422ba71b54a676234d17fb",
        userId: "5f63f20d05c8c3f40628dd23"
    },
    {
        likes: 12,
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        id: "5a422b3a1b54a676234d17f9",
        userId: "5f63f20d05c8c3f40628dd23"
    },
    {
        likes: 5,
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        id: "5a422aa71b54a676234d17f8",
        userId: "5f63f20d05c8c3f40628dd23"
    },
    {
        likes: 2,
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        id: "5a422bc61b54a676234d17fc",
        userId: "5f63f20d05c8c3f40628dd23"
    },
    {
        likes: 10,
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        id: "5a422b891b54a676234d17fa",
        userId: "5f63f20d05c8c3f40628dd23"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    blogs, nonExistingId, blogsInDb, usersInDb
}