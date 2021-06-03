import React, { useState } from 'react'

const LoginForm = ({loginUser}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    loginUser({
      username, password,
    })

    setUsername('')
    setPassword('')
  }

  return (
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
}

export default LoginForm