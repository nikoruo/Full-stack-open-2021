import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  //sisäänkirjautuminen
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(`logging in with ${username} ${password}`)
      await dispatch(loginUser({ username, password }))

      history.push('/')

      setUsername('')
      setPassword('')
    } catch {
      console.log('loggin in failed')
    }
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