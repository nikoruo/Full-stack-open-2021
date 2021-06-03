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
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

      setErrorMessage({ message: `logged in, welcome ${user.name}`, color: 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setUser(user)
      
    } catch (exception) {
      setErrorMessage({ message:'wrong username or password',color:'red'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }    
  }

  //uloskirjautuminen
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

  //uuden blogin postaaminen
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

  //kirjautumisform
  const loginForm = () => {
    return (
          <LoginForm loginUser={handleLogin} />
    )
  }

  //blogiform
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogPost} user={user} />
      </Togglable>
      <p/>
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