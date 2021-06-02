import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }    
  }

  const handleLogout = () => {
    console.log(`logging out, hope to see you again ${user.name}`)
    blogService.setToken(null)
    setTitle('')
    setAuthor('')
    setUrl('')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    console.log(`creating new blog ${title} by ${user.name}`)

    try {
      const blog = await blogService.postNew({
        title: title,
        author: author,
        url: url,
        user: user.id
      })

      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
          
      <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
    )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={ () => handleLogout()}>logout</button></p>

      <form onSubmit={handleBlogPost}>
        <h2>create new</h2>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  
    return (
      <div>
        { errorMessage !== null && < Notification message={errorMessage} /> }
        {user === null ? loginForm() : blogForm()}

      </div>
    )

}

export default App