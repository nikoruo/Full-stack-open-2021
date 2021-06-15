import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import { useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const notification = useSelector(state => state.notification.notification)
  const dispatch = useDispatch()

  //haetaan blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //tarkastetaan localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //sisäänkirjautuminen
  const handleLogin = async (userObject) => {
    console.log(`logging in with ${userObject.username} ${userObject.password}`)

    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setNotification(`logged in, welcome ${user.name}`, 'green', 3))

      setUser(user)

    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
  }

  //uloskirjautuminen
  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${user.name}`)

    dispatch(setNotification(`logged out, see you again ${user.name}`, 'green', 3))

    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //uuden blogin postaaminen
  const addBlogPost = async (blogObject) => {
    console.log(`creating new blog ${blogObject.title} by ${user.name}`)
    try {
      let blog = await blogService.postNew(blogObject)
      blog = { ...blog, user: user }
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
      <LoginForm id='loginForm' loginUser={ handleLogin } />
    )
  }

  //blogiform
  const blogForm = () => (
    <div id='blogForm'>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} user={user} />
      </Togglable>
      <p/>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )

  return (
    <div>
      { notification !== '' && < Notification />}
      {user === null ? loginForm() : blogForm()}
    </div>
  )

}

export default App