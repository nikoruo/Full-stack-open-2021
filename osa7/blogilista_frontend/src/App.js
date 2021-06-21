import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { checkStorage, logoutUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()
  const notification = useSelector(state => state.notification)
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  //haetaan blogit
  useEffect(() => {
    dispatch(initializeBlogs)

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [dispatch])

  //tarkastetaan localstorage
  useEffect(() => {
    dispatch(checkStorage())
  }, [])

  //uloskirjautuminen
  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${loggedUser.name}`)
    dispatch(logoutUser())
  }

  //uuden blogin postaaminen
  const addBlogPost = async (blogObject) => {
    console.log(`creating new blog ${blogObject.title} by ${loggedUser.name}`)
    try {
      let blog = await blogService.postNew(blogObject)
      blog = { ...blog, user: loggedUser }
      blogFormRef.current.toggleVisibility()

      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'green', 3))
      setBlogs(blogs.concat(blog))

    } catch (exception) {
      dispatch(setNotification(`error while adding a new blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //lisätään blogille tykkäys
  const addLike = async (blogObject) => {
    console.log(`giving like to ${blogObject.title} by ${blogObject.author}`)
    try {
      const blog = await blogService.addLike(blogObject)

      dispatch(setNotification(`you just liked ${blog.title} by ${blog.author}`, 'green', 3))

      console.log(blog)
      setBlogs(blogs.map(b => (b.id !== blogObject.id ? b : { ...blog, user: blogObject.user })))

    } catch (exception) {
      dispatch(setNotification(`error while liking a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //poista blogi
  const removeBlog = async (blogObject) => {
    console.log(`removing blog ${blogObject.title} by ${blogObject.author}`)
    try {
      await blogService.removeBlog(blogObject.id)

      dispatch(setNotification(`you just removed ${blogObject.title} by ${blogObject.author}`, 'green', 3))

      setBlogs(blogs.filter(b => b.id !== blogObject.id))

    } catch (exception) {
      dispatch(setNotification(`error while removing a blog ${blogObject.title} by ${blogObject.author}, please try again`, 'red', 5))
    }
  }

  //kirjautumisform
  const loginForm = () => {
    return (
      <LoginForm id='loginForm' />
    )
  }

  //blogiform
  const blogForm = () => (
    <div id='blogForm'>
      <h2>blogs</h2>
      <p>{loggedUser.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} />
      </Togglable>
      <p/>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={loggedUser} />
      )}
    </div>
  )

  return (
    <div>
      { notification.text !== '' && < Notification /> }
      { loggedUser === null ? loginForm() : blogForm() }
    </div>
  )

}

export default App