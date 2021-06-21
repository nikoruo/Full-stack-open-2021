import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog, likeBlog, user, removeBlog, action }) => {
  const containerStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    backgroundColor: 'CornflowerBlue',
    borderRadius: 12
  }

  const addLike = () => {
    likeBlog({
      user:blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  const rmvBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }
  if (action) {
    return (
      <div style={containerStyle} className='blog'>
        <div>
          <h2>{blog.title} by {blog.author}</h2>
          <ul>
            <li>{blog.url}</li>
            <li>likes {blog.likes} <button onClick={addLike}>like</button></li>
            <li>{blog.user.name}</li>
          </ul>
          {user.username === blog.user.username ? <button className='dB' style={buttonStyle} onClick={rmvBlog}>remove</button> : null}
        </div>
      </div>
    )
  }
  return (
    <div style={containerStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog