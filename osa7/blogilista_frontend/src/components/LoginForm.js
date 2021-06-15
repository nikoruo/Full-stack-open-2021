import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  //sisäänkirjautuminen
  const handleLogin = async (event) => {
    event.preventDefault()

    console.log(`logging in with ${username} ${password}`)
    dispatch(loginUser({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={ handleLogin }>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='submitLogin' type="submit">login</button>
    </form>
  )
}

export default LoginForm