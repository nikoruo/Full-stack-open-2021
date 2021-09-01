import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

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
      setUsername('')
      setPassword('')
      history.push('/')

    } catch {
      console.log('loggin in failed')
    }
  }

  return (
    <Form onSubmit={ handleLogin }>
      <Form.Group>
        <h2>Log in to application</h2>
        <Form.Label>username</Form.Label>
        <Form.Control
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id='submitLogin' variant="primary" type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm