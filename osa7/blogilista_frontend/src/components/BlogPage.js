import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogPage = () => {

  const loggedUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  //uuden blogin postaaminen
  const addBlogPost = async (blogObject) => {
    console.log(`creating new blog ${blogObject.title} by ${loggedUser.name}`)
    try {
      dispatch(createBlog(blogObject, loggedUser))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'green', 3))
    } catch (exception) {
      dispatch(setNotification(`error while adding a new blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  return (
    <div id='blogForm'>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} />
      </Togglable>
      <p />
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} action={false} />
      )}
    </div>
  )
}

export default BlogPage