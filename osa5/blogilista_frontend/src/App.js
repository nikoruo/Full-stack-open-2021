import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} ${password}`)

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setErrorMessage({ message: `logged in, welcome ${user.name}`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage({ message:'wrong username or password',color:'red'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }    
  }

  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${user.name}`)

    setErrorMessage({ message: `Logged out, see you again ${user.name}`, color: 'green' })
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)

    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlogPost = async (blogObject) => {
    console.log(`creating new blog ${blogObject.title} by ${user.name}`)
    try {
      const blog = await blogService.postNew(blogObject)

      blogFormRef.current.toggleVisibility()

      setErrorMessage({ message: `a new blog ${blog.title} by ${blog.author} added`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setBlogs(blogs.concat(blog))

    } catch (exception) {
      setErrorMessage({ message: 'Error adding a new blog, please try again', color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
    )
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} user={user} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  
    return (
      <div>
        { errorMessage !== null && < Notification info={errorMessage} /> }
        {user === null ? loginForm() : blogForm()}

      </div>
    )

}

export default App