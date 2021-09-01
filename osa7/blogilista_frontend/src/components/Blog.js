import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import { Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog, likeBlog, user, removeBlog, action }) => {
  const containerStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    backgroundColor: 'red',
    borderRadius: 12
  }

  const addLike = () => {
    likeBlog({
      user:blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments
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
          <h2>{blog.title} by author {blog.author}</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>Url: {blog.url}</ListGroup.Item>
            <ListGroup.Item>Likes: {blog.likes} <button onClick={addLike}>Like</button></ListGroup.Item>
            <ListGroup.Item>Added by: {blog.user.name}</ListGroup.Item>
          </ListGroup>
          {user.username === blog.user.username ? <Button className='dB' style={buttonStyle} onClick={rmvBlog}>remove</Button> : null}
        </div>
      </div>
    )
  }
  return (
    <div style={containerStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog