import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, voteBlog, deleteBlog } from '../reducers/blogReducer'
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

  //lisätään blogille tykkäys
  const addLike = async (blogObject) => {
    console.log(`giving like to ${blogObject.title} by ${blogObject.author}`)
    try {
      dispatch(voteBlog(blogObject))
      dispatch(setNotification(`you just liked ${blogObject.title} by ${blogObject.author}`, 'green', 3))
    } catch (exception) {
      dispatch(setNotification(`error while liking a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //poista blogi
  const removeBlog = async (blogObject) => {
    console.log(`removing blog ${blogObject.title} by ${blogObject.author}`)
    try {
      //await blogService.removeBlog(blogObject.id)
      dispatch(deleteBlog(blogObject.id))
      dispatch(setNotification(`you just removed ${blogObject.title} by ${blogObject.author}`, 'green', 3))

      //setBlogs(blogs.filter(b => b.id !== blogObject.id))

    } catch (exception) {
      dispatch(setNotification(`error while removing a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  return (
    <div id='blogForm'>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} />
      </Togglable>
      <p />
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={loggedUser} />
      )}
    </div>
  )
}

export default BlogPage