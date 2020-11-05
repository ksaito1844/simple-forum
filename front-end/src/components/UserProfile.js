import React from 'react'
import {
  Link,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Blog} from './Bloglist'

const UserProfile = ({user}) => {
  const blogs = useSelector(state => state.blogs)
  const usersBlogs = blogs.filter(b => b.author === user.name)

  return (
    <div>
      <h2>{user.username}</h2>
      <br/>
      <hr/>
      <div>
        <h4>Information:</h4>
        <br/>
        <p><strong>Name:</strong> {user.name}</p>
        <br/>
        <h4>Blog Posts:</h4>
        <br/>
        <ul>
          {usersBlogs
            .map(blog =>
              <li>
                <Link to={`/blogs/${blog.id}`}
                      key={blog.id}
                >
                  <Blog
                    blog={blog}
                  />
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default UserProfile